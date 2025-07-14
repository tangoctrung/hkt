import { Button, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatCurrencyVND, formatDateToTimestring } from '../../utils';
import { convertErrApi } from '../../utils';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { deleteOrder, getOrders, updateOrder } from '../../endpoint/user';
import { dataOrdersFake } from '../../assets/dataFake/dataTable';
const Context = React.createContext({ name: 'Default' });

interface DataType {
  stt: number;
  _id: string;
  orderId: string;
  orderName: string;
  customerId: string;
  createdAt: string;
  quanlity: number;
  price: number;
  totalPayment: number;
}

function ManagerOrder() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrderChoose, setOrderChoose] = useState<Omit<DataType, 'stt' | 'totalPayment'>>({
    _id: "",
    orderId: "",
    orderName: "",
    customerId: "",
    createdAt: "",
    quanlity: 0,
    price: 0,
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("add")
  const [dataOrders, setDataOrders] = useState<DataType[]>(dataOrdersFake)
  const [dataOrdersReal, setDataOrdersReal] = useState<DataType[]>(dataOrdersFake)

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Tên đơn hàng',
      dataIndex: 'orderName',
      key: 'orderName',
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Ngày đặt',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (value: any, record: any) => (
        <div>
          {formatDateToTimestring(value)}
        </div>
      ),
    },
    {
      title: 'Số lượng',
      key: 'quanlity',
      dataIndex: 'quanlity',
    },
    {
      title: 'Đơn giá',
      key: 'price',
      dataIndex: 'price',
      render: (value: any, record: any) => (
        <div>
          {formatCurrencyVND(value)}
        </div>
      ),
    },
    {
      title: 'Tổng thanh toán',
      key: 'totalPayment',
      dataIndex: 'totalPayment',
      render: (value: any, record: any) => (
        <div>
          {formatCurrencyVND(record?.price * record?.quanlity)}
        </div>
      ),
    },
    {
      title: 'Hoạt động',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => { handleOpenModal("edit"); setOrderChoose(record) }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setOrderChoose(record) }} icon={<DeleteOutlined />}></Button>
        </div>
      ),
    },
  ];

  const openNotificationFail = (placement: NotificationPlacement) => {
    api.error({
      message: `Thông báo`,
      description: <Context.Consumer>{({ name }) => name}</Context.Consumer>,
      placement,
    });
  };

  // useEffect(() => {
  //   setIsLoading(true)
  //   getOrders()
  //     .then((res) => {
  //       let orders = [...res?.data?.data?.orders]
  //       let orders1 = orders?.map((item: any, index: number) => {
  //         return { stt: index + 1, ...item }
  //       })
  //       setDataOrders(orders1)
  //       setDataOrdersReal(orders1)
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const data = dataOrdersReal?.filter((item: DataType) => (item.orderName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.orderId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))
      setDataOrders(data)
    }, 500)

    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataOrdersReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setOrderChoose({
      ...dataOrderChoose,
      [e.target.name]: e.target.value
    })
  }

  const handleCancelModal = () => {
    setOpenModal(false)
    setOrderChoose({
      _id: "",
      orderId: "",
      orderName: "",
      customerId: "",
      createdAt: "",
      quanlity: 0,
      price: 0,
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataOrderChoose });
    setIsLoading(true)

    if (typeModal === "edit") {
      updateOrder(dataOrderChoose)
        .then((res) => {
          const order = res.data?.data?.order
          const orders = dataOrders?.map((item: any, index: number) => item?._id === order?._id ? { ...order, stt: index + 1 } : item)
          setDataOrders(orders)
          handleCancelModal()
        })
        .catch((err) => {
          const message = convertErrApi(err)
          setMessageNoti(message)
          openNotificationFail("topRight")
        })
        .finally(() => {
          setIsLoading(false)
        })
      return;
    }

    if (typeModal === "delete") {
      deleteOrder(dataOrderChoose?._id)
        .then((res) => {
          const orders = dataOrders?.filter((staff: any) => staff?._id !== dataOrderChoose?._id)
          setDataOrders(orders)
          setOpenModal(false)
        })
        .catch((err) => {
          const message = convertErrApi(err)
          setMessageNoti(message)
          openNotificationFail("topRight")
        })
        .finally(() => {
          setIsLoading(false)
        })
      return;
    }


  }

  const contextValue = useMemo(() => ({ name: messageNoti }), [messageNoti]);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className='w-full h-full'>
        <div className='mt-0 flex justify-between items-center'>
          <div className='w-[30%]'>
            <Input size='large' placeholder='Tìm kiếm đơn hàng' prefix={<SearchOutlined />} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
          </div>
          {/* <Button onClick={() => handleOpenModal("add")}>Thêm đơn hàng</Button> */}
        </div>
        <div className='mt-[30px]'>
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataOrders} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm đơn hàng" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
          centered
          closable
          open={openModal}
          onOk={handleSubmitForm}
          confirmLoading={isLoading}
          onCancel={handleCancelModal}
          destroyOnClose
          width={600}
          style={{ maxHeight: "800px" }}
        >
          {typeModal === "delete" ?
            <h3>Bạn có chắc chắn muốn xóa đơn hàng này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã đơn hàng" size='large'
                  name='orderId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataOrderChoose?.orderId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Tên đơn hàng" size='large'
                  name='orderName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataOrderChoose?.orderName}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã khách hàng" size='large'
                  name='customerId'
                  onChange={handleChangeInfo}
                  value={dataOrderChoose?.customerId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số lượng" size='large'
                  name='quanlity'
                  onChange={handleChangeInfo}
                  value={dataOrderChoose?.quanlity}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Đơn giá" size='large'
                  name='price'
                  onChange={handleChangeInfo}
                  value={dataOrderChoose?.price}
                />
              </div>
              <div className='mb-[20px]'>
                Tổng thanh toán: <b className='text-xl'>{formatCurrencyVND(dataOrderChoose.price * dataOrderChoose.quanlity)}</b>
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ManagerOrder