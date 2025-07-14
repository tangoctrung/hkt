import { Button, DatePicker, DatePickerProps, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NotificationPlacement } from 'antd/es/notification/interface';
import dayjs from 'dayjs';
import { convertErrApi } from '../../utils';
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from '../../endpoint/user';
import { dataCustomersFake } from '../../assets/dataFake/dataTable';
const Context = React.createContext({ name: 'Default' });
const dateFormat = 'YYYY/MM/DD';

interface DataType {
  stt: number;
  _id: string;
  customerId: string;
  customerName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
}

function ManagerCustomer() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataCustomerChoose, setCustomerChoose] = useState<Omit<DataType, 'stt'>>({
    _id: "",
    dob: "",
    email: "",
    gender: "",
    phone: "",
    customerId: "",
    customerName: "",
    address: "",
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("add")
  const [dataCustomers, setDataCustomers] = useState<DataType[]>(dataCustomersFake)
  const [dataCustomersReal, setDataCustomersReal] = useState<DataType[]>(dataCustomersFake)

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Giới tính',
      key: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Địa chỉ',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: 'Hoạt động',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => { handleOpenModal("edit"); setCustomerChoose(record) }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setCustomerChoose(record) }} icon={<DeleteOutlined />}></Button>
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
  //   getCustomers()
  //     .then((res) => {
  //       let customers = [...res?.data?.data?.customers]
  //       let customers1 = customers?.map((item: any, index: number) => {
  //         return { stt: index + 1, ...item }
  //       })
  //       setDataCustomers(customers1)
  //       setDataCustomersReal(customers1)
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
      const data = dataCustomersReal?.filter((item: DataType) => (item.customerName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.phone.includes(textSearch) || item.customerId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))

      setDataCustomers(data)
    }, 500)
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataCustomersReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setCustomerChoose({
      ...dataCustomerChoose,
      [e.target.name]: e.target.value
    })
  }
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setCustomerChoose({
      ...dataCustomerChoose,
      dob: dateString
    })
  };

  const handleCancelModal = () => {
    setOpenModal(false)
    setCustomerChoose({
      _id: "",
      dob: "",
      email: "",
      gender: "",
      phone: "",
      customerId: "",
      customerName: "",
      address: ""
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataCustomerChoose });
    setIsLoading(true)
    if (typeModal === "add") {
      const dataRequest: Omit<DataType, "stt" | "_id"> = {
        dob: dataCustomerChoose?.dob,
        email: dataCustomerChoose?.email,
        gender: dataCustomerChoose?.gender,
        phone: dataCustomerChoose?.phone,
        customerId: dataCustomerChoose?.customerId,
        customerName: dataCustomerChoose?.customerName,
        address: dataCustomerChoose?.address,
      }
      createCustomer(dataRequest)
        .then((res) => {
          setDataCustomers([...dataCustomers, { ...res?.data?.data?.customer, stt: dataCustomers?.length + 1 }])
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
      updateCustomer(dataCustomerChoose)
        .then((res) => {
          const customer = res.data?.data?.customer
          const customers = dataCustomers?.map((item: any, index: number) => item?._id === customer?._id ? { ...customer, stt: index + 1 } : item)
          setDataCustomers(customers)
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
      deleteCustomer(dataCustomerChoose?._id)
        .then((res) => {
          const customer = dataCustomers?.filter((staff: any) => staff?.customerId !== dataCustomerChoose?.customerId)
          setDataCustomers(customer)
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
            <Input size='large' placeholder='Tìm kiếm khách hàng' prefix={<SearchOutlined />} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
          </div>
          <Button onClick={() => handleOpenModal("add")}>Thêm khách hàng</Button>
        </div>
        <div className='mt-[30px]'>
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataCustomers} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm khách hàng" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
          centered
          closable
          open={openModal}
          onOk={handleSubmitForm}
          onCancel={handleCancelModal}
          confirmLoading={isLoading}
          destroyOnClose
          width={600}
          style={{ maxHeight: "800px" }}
        >
          {typeModal === "delete" ?
            <h3>Bạn có chắc chắn muốn xóa khách hàng này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã khách hàng" size='large'
                  name='customerId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataCustomerChoose?.customerId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Họ tên" size='large'
                  name='customerName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataCustomerChoose?.customerName}
                />
              </div>
              <div className='mb-[20px]'>
                <DatePicker onChange={onChangeDate} defaultValue={dayjs(dataCustomerChoose?.dob || "0000-00-00", dateFormat)} placeholder='Ngày sinh' className='w-full' size='large' />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Giới tính" size='large'
                  name='gender'
                  onChange={handleChangeInfo}
                  value={dataCustomerChoose?.gender}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số điện thoại" size='large'
                  name='phone'
                  onChange={handleChangeInfo}
                  value={dataCustomerChoose?.phone}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Email" size='large'
                  name='email'
                  onChange={handleChangeInfo}
                  value={dataCustomerChoose?.email}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Địa chỉ" size='large'
                  name='address'
                  onChange={handleChangeInfo}
                  value={dataCustomerChoose?.address}
                />
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ManagerCustomer