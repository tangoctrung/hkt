import { Button, DatePicker, DatePickerProps, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { dataInventorysFake } from '../../assets/dataFake/dataTable';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatCurrencyVND, formatDateToTimestring } from '../../utils';
import { NotificationPlacement } from 'antd/es/notification/interface';
import dayjs from 'dayjs';
import { convertErrApi } from '../../utils';
import { createInventory, deleteInventory, getInventorys, updateInventory } from '../../endpoint/user';
const Context = React.createContext({ name: 'Default' });
const dateFormat = 'YYYY/MM/DD';

interface DataType {
  stt: number;
  _id: string;
  inventoryId: string;
  inventoryName: string;
  createdAt: string;
  productId: string;
  quanlityInput: number;
  quanlityOutput: number;
  quanlityInventory: number;
  price: number;
  totalInventory: number;
}

function ReportInventory() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataInventoryChoose, setInventoryChoose] = useState<Omit<DataType, 'stt' | 'totalInventory'>>({
    _id: "",
    inventoryId: "",
    inventoryName: "",
    createdAt: "",
    productId: "",
    quanlityInput: 0,
    quanlityOutput: 0,
    quanlityInventory: 0,
    price: 0,
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("edit")
  const [dataInventorys, setDataInventorys] = useState<DataType[]>([])
  const [dataInventorysReal, setDataInventorysReal] = useState<DataType[]>([])

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã báo cáo',
      dataIndex: 'inventoryId',
      key: 'inventoryId',
    },
    {
      title: 'Tên báo cáo',
      dataIndex: 'inventoryName',
      key: 'inventoryName',
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
      title: 'Số lượng nhập',
      key: 'quanlityInput',
      dataIndex: 'quanlityInput',
    },
    {
      title: 'Số lượng xuất',
      key: 'quanlityOutput',
      dataIndex: 'quanlityOutput',
    },
    {
      title: 'Số lượng tồn kho',
      key: 'quanlityInventory',
      dataIndex: 'quanlityInventory',
      render: (value: any, record: any) => (
        <div>
          {record?.quanlityInput - record?.quanlityOutput}
        </div>
      ),
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
      key: 'totalInventory',
      dataIndex: 'totalInventory',
      render: (value: any, record: any) => (
        <div>
          {formatCurrencyVND(record?.price * (record?.quanlityInput - record?.quanlityOutput))}
        </div>
      ),
    },
    {
      title: 'Hoạt động',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => { handleOpenModal("edit"); setInventoryChoose(record) }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setInventoryChoose(record) }} icon={<DeleteOutlined />}></Button>
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
    getInventorys()
      .then((res) => {
        let inventorys = [...res?.data?.data?.inventorys]
        let inventorys1 = inventorys?.map((item: any, index: number) => {
          return { stt: index + 1, ...item }
        })
        setDataInventorys(inventorys1)
        setDataInventorysReal(inventorys1)
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
      const data = dataInventorysReal?.filter((item: DataType) => (item.inventoryName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.inventoryId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))
      setDataInventorys(data)
    }, 500)
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataInventorysReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setInventoryChoose({
      ...dataInventoryChoose,
      [e.target.name]: e.target.value
    })
  }

  const handleCancelModal = () => {
    setOpenModal(false)
    setInventoryChoose({
      _id: "",
      inventoryId: "",
      inventoryName: "",
      createdAt: "",
      productId: "",
      quanlityInput: 0,
      quanlityOutput: 0,
      quanlityInventory: 0,
      price: 0,
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataInventoryChoose });
    setIsLoading(true)
    if (typeModal === "add") {
      const dataRequest: Omit<DataType, "stt" | "_id" | "createdAt" | 'totalInventory' | 'quanlityInventory'> = {
        inventoryId: dataInventoryChoose?.inventoryId,
        inventoryName: dataInventoryChoose?.inventoryName,
        productId: dataInventoryChoose?.productId,
        quanlityInput: dataInventoryChoose?.quanlityInput,
        quanlityOutput: dataInventoryChoose?.quanlityOutput,
        price: dataInventoryChoose?.price,
      }
      createInventory(dataRequest)
        .then((res) => {
          setDataInventorys([...dataInventorys, { ...res?.data?.data?.inventory, stt: dataInventorys?.length + 1 }])
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
      updateInventory(dataInventoryChoose)
        .then((res) => {
          const inventory = res.data?.data?.inventory
          const inventorys = dataInventorys?.map((item: any, index: number) => item?._id === inventory?._id ? { ...inventory, stt: index + 1 } : item)
          setDataInventorys(inventorys)
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
      deleteInventory(dataInventoryChoose?._id)
        .then((res) => {
          const inventorys = dataInventorys?.filter((inventory: any) => inventory?._id !== dataInventoryChoose?._id)
          setDataInventorys(inventorys)
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
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataInventorys} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm báo cáo" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
          centered
          closable
          open={openModal}
          confirmLoading={isLoading}
          destroyOnClose
          onOk={handleSubmitForm}
          onCancel={handleCancelModal}
          width={600}
          style={{ maxHeight: "800px" }}
        >
          {typeModal === "delete" ?
            <h3>Bạn có chắc chắn muốn xóa báo cáo này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã báo cáo" size='large'
                  name='inventoryId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataInventoryChoose?.inventoryId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Tên báo cáo" size='large'
                  name='inventoryName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataInventoryChoose?.inventoryName}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã sản phẩm" size='large'
                  name='productId'
                  onChange={handleChangeInfo}
                  value={dataInventoryChoose?.productId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số lượng nhập" size='large'
                  name='quanlityInput'
                  onChange={handleChangeInfo}
                  value={dataInventoryChoose?.quanlityInput}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số lượng xuất" size='large'
                  name='quanlityOutput'
                  onChange={handleChangeInfo}
                  value={dataInventoryChoose?.quanlityOutput}
                />
              </div>
              <div className='mb-[20px]'>
                Số lượng tồn kho: <b className='text-xl'>{(dataInventoryChoose?.quanlityInput - dataInventoryChoose.quanlityOutput) || 0}</b>
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Đơn giá" size='large'
                  name='price'
                  onChange={handleChangeInfo}
                  value={dataInventoryChoose?.price}
                />
              </div>
              <div className='mb-[20px]'>
                Tổng tiền: <b className='text-xl'>{formatCurrencyVND((dataInventoryChoose?.price || 0) * ((dataInventoryChoose?.quanlityInput || 0) - (dataInventoryChoose?.quanlityOutput || 0)) || 0)}</b>
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ReportInventory