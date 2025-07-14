import { Button, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { convertErrApi, formatCurrencyVND } from '../../utils';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { deleteInvoice, getInvoices, updateInvoice } from '../../endpoint/user';
import { dataInvoicesFake } from '../../assets/dataFake/dataTable';
const Context = React.createContext({ name: 'Default' });

interface DataType {
  stt: number;
  _id: string;
  invoiceId: string;
  productId: string;
  customerId: string;
  customerName: string;
  productName: string;
  quanlity: number;
  price: number;
  totalMoney: number;
}

function ManagerInvoice() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataInvoiceChoose, setInvoiceChoose] = useState<Omit<DataType, 'stt' | 'totalMoney'>>({
    _id: "",
    invoiceId: "",
    productId: "",
    customerId: "",
    customerName: "",
    productName: "",
    quanlity: 0,
    price: 0,
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("add")
  const [dataInvoices, setDataInvoices] = useState<DataType[]>(dataInvoicesFake)
  const [dataInvoicesReal, setDataInvoicesReal] = useState<DataType[]>(dataInvoicesFake)

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã hoá đơn',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
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
      title: 'Tổng tiền',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
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
          <Button onClick={() => { handleOpenModal("edit"); setInvoiceChoose(record) }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setInvoiceChoose(record) }} icon={<DeleteOutlined />}></Button>
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
  //   getInvoices()
  //     .then((res) => {
  //       let invoices = [...res?.data?.data?.invoices]
  //       let invoices1 = invoices?.map((item: any, index: number) => {
  //         return { stt: index + 1, ...item }
  //       })
  //       setDataInvoices(invoices1)
  //       setDataInvoicesReal(invoices1)
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
      const data = dataInvoicesReal?.filter((item: DataType) => (item.customerId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.invoiceId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.productId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))
      setDataInvoices(data)
    }, 500)

    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataInvoicesReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setInvoiceChoose({
      ...dataInvoiceChoose,
      [e.target.name]: e.target.value
    })
  }
  const handleCancelModal = () => {
    setOpenModal(false)
    setInvoiceChoose({
      _id: "",
      invoiceId: "",
      productId: "",
      customerId: "",
      customerName: "",
      productName: "",
      quanlity: 0,
      price: 0,
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataInvoiceChoose });
    setIsLoading(true)

    if (typeModal === "edit") {
      updateInvoice(dataInvoiceChoose)
        .then((res) => {
          const invoice = res.data?.data?.invoice
          const invoices = dataInvoices?.map((item: any, index: number) => item?._id === invoice?._id ? { ...invoice, stt: index + 1 } : item)
          setDataInvoices(invoices)
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
      deleteInvoice(dataInvoiceChoose?._id)
        .then((res) => {
          const orders = dataInvoices?.filter((staff: any) => staff?._id !== dataInvoiceChoose?._id)
          setDataInvoices(orders)
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
            <Input size='large' placeholder='Tìm kiếm hoá đơn' prefix={<SearchOutlined />} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
          </div>
          {/* <Button onClick={() => handleOpenModal("add")}>Thêm hoá đơn</Button> */}
        </div>
        <div className='mt-[30px]'>
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataInvoices} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm hoá đơn" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
          centered
          closable
          open={openModal}
          onOk={handleSubmitForm}
          confirmLoading={isLoading}
          onCancel={handleCancelModal}
          width={600}
          style={{ maxHeight: "800px" }}
        >
          {typeModal === "delete" ?
            <h3>Bạn có chắc chắn muốn xóa hoá đơn này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã hoá đơn" size='large'
                  name='invoiceId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.invoiceId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã sản phẩm" size='large'
                  name='productId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.productId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã khách hàng" size='large'
                  name='customerId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.customerId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Tên khách hàng" size='large'
                  name='customerName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.customerName}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Tên sản phẩm" size='large'
                  name='productName'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.productName}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số lượng" size='large'
                  name='quanlity'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.quanlity}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Đơn giá" size='large'
                  name='price'
                  onChange={handleChangeInfo}
                  value={dataInvoiceChoose?.price}
                />
              </div>
              <div className='mb-[20px]'>
                Tổng tiền: <b className='text-xl'>{formatCurrencyVND(dataInvoiceChoose.price * dataInvoiceChoose.quanlity)}</b>
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ManagerInvoice