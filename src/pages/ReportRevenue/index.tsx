import { Button, DatePicker, DatePickerProps, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { dataRevenuesFake } from '../../assets/dataFake/dataTable';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatCurrencyVND, formatDateToTimestring } from '../../utils';
import { NotificationPlacement } from 'antd/es/notification/interface';
import dayjs from 'dayjs';
import { convertErrApi } from '../../utils';
import { createRevenue, deleteRevenue, getRevenues, updateRevenue } from '../../endpoint/user';
const Context = React.createContext({ name: 'Default' });
const dateFormat = 'YYYY/MM/DD';

interface DataType {
  stt: number;
  _id: string;
  revenueId: string;
  revenueName: string;
  productId: string;
  quanlity: number;
  createdAt: string;
  price: number;
  totalRevenue: number;
}

function ReportRevenue() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataRevenueChoose, setRevenueChoose] = useState<Omit<DataType, 'stt' | 'totalRevenue'>>({
    _id: "",
    revenueId: "",
    revenueName: "",
    productId: "",
    quanlity: 0,
    createdAt: "",
    price: 0,
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("edit")
  const [dataRevenues, setDataRevenues] = useState<DataType[]>([])
  const [dataRevenuesReal, setDataRevenuesReal] = useState<DataType[]>([])

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã báo cáo',
      dataIndex: 'revenueId',
      key: 'revenueId',
    },
    {
      title: 'Tên báo cáo',
      dataIndex: 'revenueName',
      key: 'revenueName',
    },
    {
      title: 'Ngày lập',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: any, record: any) => (
        <div>
          {formatDateToTimestring(value)}
        </div>
      ),
    },
    {
      title: 'Mã sản phẩm',
      key: 'productId',
      dataIndex: 'productId',
    },
    {
      title: 'Số lượng SP',
      key: 'quanlity',
      dataIndex: 'quanlity',
    },
    {
      title: 'Chi phí bán',
      key: 'price',
      dataIndex: 'price',
      render: (value: any, record: any) => (
        <div>
          {formatCurrencyVND(value)}
        </div>
      ),
    },
    {
      title: 'Tổng doanh thu',
      key: 'totalRevenue',
      dataIndex: 'totalRevenue',
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
          <Button onClick={() => { handleOpenModal("edit"); setRevenueChoose(record) }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setRevenueChoose(record) }} icon={<DeleteOutlined />}></Button>
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

  useEffect(() => {
    setIsLoading(true)
    getRevenues()
      .then((res) => {
        let revenues = [...res?.data?.data?.revenues]
        let revenues1 = revenues?.map((item: any, index: number) => {
          return { stt: index + 1, ...item }
        })
        setDataRevenues(revenues1)
        setDataRevenuesReal(revenues1)
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const data = dataRevenuesReal?.filter((item: DataType) => (item.revenueName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.revenueId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))
      setDataRevenues(data)
    }, 500)

    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataRevenuesReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setRevenueChoose({
      ...dataRevenueChoose,
      [e.target.name]: e.target.value
    })
  }

  const handleCancelModal = () => {
    setOpenModal(false)
    setRevenueChoose({
      _id: "",
      revenueId: "",
      revenueName: "",
      productId: "",
      quanlity: 0,
      createdAt: "",
      price: 0,
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataRevenueChoose });
    setIsLoading(true)
    if (typeModal === "add") {
      const dataRequest: Omit<DataType, "stt" | "_id" | "createdAt" | 'totalRevenue'> = {
        revenueId: dataRevenueChoose?.revenueId,
        revenueName: dataRevenueChoose?.revenueName,
        productId: dataRevenueChoose?.productId,
        quanlity: dataRevenueChoose?.quanlity,
        price: dataRevenueChoose?.price,
      }
      createRevenue(dataRequest)
        .then((res) => {
          setDataRevenues([...dataRevenues, { ...res?.data?.data?.revenue, stt: dataRevenues?.length + 1 }])
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

    if (typeModal === "edit") {
      updateRevenue(dataRevenueChoose)
        .then((res) => {
          const revenue = res.data?.data?.revenue
          const revenues = dataRevenues?.map((item: any, index: number) => item?._id === revenue?._id ? { ...revenue, stt: index + 1 } : item)
          setDataRevenues(revenues)
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
      deleteRevenue(dataRevenueChoose?._id)
        .then((res) => {
          const revenues = dataRevenues?.filter((revenue: any) => revenue?._id !== dataRevenueChoose?._id)
          setDataRevenues(revenues)
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
            <Input size='large' placeholder='Tìm kiếm báo cáo' prefix={<SearchOutlined />} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
          </div>
          <Button onClick={() => handleOpenModal("add")}>Thêm báo cáo</Button>
        </div>
        <div className='mt-[30px]'>
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataRevenues} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm báo cáo" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
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
            <h3>Bạn có chắc chắn muốn xóa báo cáo này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã báo cáo" size='large'
                  name='revenueId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataRevenueChoose?.revenueId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Tên báo cáo" size='large'
                  name='revenueName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataRevenueChoose?.revenueName}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã sản phẩm" size='large'
                  name='productId'
                  onChange={handleChangeInfo}
                  value={dataRevenueChoose?.productId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số lượng SP" size='large'
                  name='quanlity'
                  onChange={handleChangeInfo}
                  value={dataRevenueChoose?.quanlity}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Chi phí bán" size='large'
                  name='price'
                  onChange={handleChangeInfo}
                  value={dataRevenueChoose?.price}
                />
              </div>
              <div className='mb-[20px]'>
                Tổng tiền: <b className='text-xl'>{formatCurrencyVND(dataRevenueChoose?.quanlity * dataRevenueChoose?.price)}</b>
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ReportRevenue