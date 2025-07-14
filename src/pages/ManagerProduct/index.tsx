import { Button, DatePicker, DatePickerProps, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatCurrencyVND } from '../../utils';
import dayjs from 'dayjs';
import { convertErrApi } from '../../utils';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../endpoint/user';
import { dataProductsFake } from '../../assets/dataFake/dataTable';
const Context = React.createContext({ name: 'Default' });
const dateFormat = 'YYYY/MM/DD';

interface DataType {
  stt: number;
  _id: string;
  productId: string;
  productName: string;
  timeInput: string;
  supplier: string;
  quanlity: number;
  price: number;
}

function ManagerProduct() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataProductChoose, setProductChoose] = useState<Omit<DataType, 'stt'>>({
    _id: "",
    productId: "",
    productName: "",
    timeInput: "",
    supplier: "",
    quanlity: 0,
    price: 0,
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("add")
  const [dataProducts, setDataProducts] = useState<DataType[]>(dataProductsFake)
  const [dataProductsReal, setDataProductsReal] = useState<DataType[]>(dataProductsFake)

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'timeInput',
      key: 'timeInput',
    },
    {
      title: 'Nhà cung cấp',
      key: 'supplier',
      dataIndex: 'supplier',
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
      title: 'Hoạt động',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => { handleOpenModal("edit"); setProductChoose(record) }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setProductChoose(record) }} icon={<DeleteOutlined />}></Button>
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
  //   getProducts()
  //     .then((res) => {
  //       let products = [...res?.data?.data?.products]
  //       let products1 = products?.map((item: any, index: number) => {
  //         return { stt: index + 1, ...item }
  //       })
  //       setDataProducts(products1)
  //       setDataProductsReal(products1)
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
      const data = dataProductsReal?.filter((item: DataType) => (item.productName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.supplier.includes(textSearch.toLocaleLowerCase()) || item.productId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))
      setDataProducts(data)
    }, 500)

    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataProductsReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setProductChoose({
      ...dataProductChoose,
      [e.target.name]: e.target.value
    })
  }
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setProductChoose({
      ...dataProductChoose,
      timeInput: dateString
    })
  };

  const handleCancelModal = () => {
    setOpenModal(false)
    setProductChoose({
      _id: "",
      productId: "",
      productName: "",
      timeInput: "",
      supplier: "",
      quanlity: 0,
      price: 0,
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataProductChoose });
    setIsLoading(true)
    if (typeModal === "add") {
      const dataRequest: Omit<DataType, "stt" | "_id"> = {
        timeInput: dataProductChoose?.timeInput,
        productId: dataProductChoose?.productId,
        productName: dataProductChoose?.productName,
        supplier: dataProductChoose?.supplier,
        quanlity: dataProductChoose?.quanlity,
        price: dataProductChoose?.price,
      }
      createProduct(dataRequest)
        .then((res) => {
          setDataProducts([...dataProducts, { ...res?.data?.data?.product, stt: dataProducts?.length + 1 }])
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
      updateProduct(dataProductChoose)
        .then((res) => {
          const product = res.data?.data?.product
          const products = dataProducts?.map((item: any, index: number) => item?._id === product?._id ? { ...product, stt: index + 1 } : item)
          setDataProducts(products)
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
      deleteProduct(dataProductChoose?._id)
        .then((res) => {
          const products = dataProducts?.filter((product: any) => product?._id !== dataProductChoose?._id)
          setDataProducts(products)
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
            <Input size='large' placeholder='Tìm kiếm sản phẩm' prefix={<SearchOutlined />} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
          </div>
          <Button onClick={() => handleOpenModal("add")}>Thêm sản phẩm</Button>
        </div>
        <div className='mt-[30px]'>
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataProducts} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm sản phẩm" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
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
            <h3>Bạn có chắc chắn muốn xóa sản phẩm này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã sản phẩm" size='large'
                  name='productId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataProductChoose?.productId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Tên sản phẩm" size='large'
                  name='productName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataProductChoose?.productName}
                />
              </div>
              <div className='mb-[20px]'>
                <DatePicker onChange={onChangeDate} defaultValue={dayjs(dataProductChoose?.timeInput || "0000-00-00", dateFormat)} placeholder='Ngày nhập' className='w-full' size='large' />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Nhà cung cấp" size='large'
                  name='supplier'
                  onChange={handleChangeInfo}
                  value={dataProductChoose?.supplier}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số lượng" size='large'
                  name='quanlity'
                  onChange={handleChangeInfo}
                  value={dataProductChoose?.quanlity}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Đơn giá" size='large'
                  name='price'
                  onChange={handleChangeInfo}
                  value={dataProductChoose?.price}
                />
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ManagerProduct