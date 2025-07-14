import { Button, DatePicker, DatePickerProps, Input, Modal, notification } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { createStaff, deleteStaff, getStaffs, updateStaff } from '../../endpoint/user';
import { NotificationPlacement } from 'antd/es/notification/interface';
import dayjs from 'dayjs';
import { convertErrApi } from '../../utils';
import { dataStaffsFake } from '../../assets/dataFake/dataTable';
const Context = React.createContext({ name: 'Default' });
const dateFormat = 'YYYY/MM/DD';

interface DataType {
  stt: number;
  _id: string;
  staffId: string;
  staffName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
}

function ManagerStaff() {
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false);
  const [dataStaffChoose, setStaffChoose] = useState<Omit<DataType, 'stt'>>({
    _id: "",
    dob: "",
    email: "",
    gender: "",
    phone: "",
    staffId: "",
    staffName: "",
  })
  const [typeModal, setTypeModal] = useState<"edit" | "add" | "delete">("add")
  const [dataStaffs, setDataStaffs] = useState<DataType[]>(dataStaffsFake)
  const [dataStaffsReal, setDataStaffsReal] = useState<DataType[]>(dataStaffsFake)

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'staffId',
      key: 'staffId',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'staffName',
      key: 'staffName',
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
      title: 'Hoạt động',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <Button onClick={() => { handleOpenModal("edit"); setStaffChoose(record); }} icon={<EditOutlined />} className='mr-1'></Button>
          <Button onClick={() => { handleOpenModal("delete"); setStaffChoose(record) }} icon={<DeleteOutlined />}></Button>
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
  //   getStaffs()
  //     .then((res) => {
  //       let staffs = [...res?.data?.data?.staffs]
  //       let staffs1 = staffs?.map((item: any, index: number) => {
  //         return { stt: index + 1, ...item }
  //       })
  //       setDataStaffs(staffs1)
  //       setDataStaffsReal(staffs1)
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //       setDataStaffs(dataStaffsFake)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //       setDataStaffs(dataStaffsFake)
  //     })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const data = dataStaffsReal?.filter((item: DataType) => (item.staffName.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
        item.phone.includes(textSearch) || item.staffId.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())))
      setDataStaffs(data)
    }, 500)
    return () => {
      clearTimeout(searchTimeout)
    }
  }, [textSearch, dataStaffsReal])

  const handleOpenModal = (type: "edit" | "add" | "delete") => {
    setOpenModal(true)
    setTypeModal(type)
  }
  const handleChangeInfo = (e: any) => {
    setStaffChoose({
      ...dataStaffChoose,
      [e.target.name]: e.target.value
    })
  }
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setStaffChoose({
      ...dataStaffChoose,
      dob: dateString
    })
  };

  const handleCancelModal = () => {
    setOpenModal(false)
    setStaffChoose({
      _id: "",
      dob: "",
      email: "",
      gender: "",
      phone: "",
      staffId: "",
      staffName: "",
    })
  }

  const handleSubmitForm = () => {
    console.log({ dataStaffChoose });
    setIsLoading(true)
    if (typeModal === "add") {
      const dataRequest: Omit<DataType, "stt" | "_id"> = {
        dob: dataStaffChoose?.dob,
        email: dataStaffChoose?.email,
        gender: dataStaffChoose?.gender,
        phone: dataStaffChoose?.phone,
        staffId: dataStaffChoose?.staffId,
        staffName: dataStaffChoose?.staffName,
      }
      createStaff(dataRequest)
        .then((res) => {
          setDataStaffs([...dataStaffs, { ...res?.data?.data?.staff, stt: dataStaffs?.length + 1 }])
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
      updateStaff(dataStaffChoose)
        .then((res) => {
          const staff = res.data?.data?.staff
          const staffs = dataStaffs?.map((item: any, index: number) => item?._id === staff?._id ? { ...staff, stt: index + 1 } : item)
          setDataStaffs(staffs)
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
      deleteStaff(dataStaffChoose?._id)
        .then((res) => {
          const staffs = dataStaffs?.filter((staff: any) => staff?.staffId !== dataStaffChoose?.staffId)
          setDataStaffs(staffs)
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
            <Input size='large' placeholder='Tìm kiếm nhân viên' prefix={<SearchOutlined />} value={textSearch} onChange={(e) => setTextSearch(e.target.value)} />
          </div>
          <Button onClick={() => handleOpenModal("add")}>Thêm nhân viên</Button>
        </div>
        <div className='mt-[30px]'>
          <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={dataStaffs} loading={isLoading} />
        </div>

        <Modal
          title={typeModal === "add" ? "Thêm nhân viên" : (typeModal === "edit" ? "Chỉnh sửa thông tin" : "")}
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
            <h3>Bạn có chắc chắn muốn xóa nhân viên này không?</h3> :
            <div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Mã nhân viên" size='large'
                  name='staffId'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataStaffChoose?.staffId}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Họ tên" size='large'
                  name='staffName'
                  className='mr-[10px]'
                  onChange={handleChangeInfo}
                  value={dataStaffChoose?.staffName}
                />
              </div>
              <div className='mb-[20px]'>
                <DatePicker onChange={onChangeDate} defaultValue={dayjs(dataStaffChoose?.dob || "0000-00-00", dateFormat)} placeholder='Ngày sinh' className='w-full' size='large' />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Giới tính" size='large'
                  name='gender'
                  onChange={handleChangeInfo}
                  value={dataStaffChoose?.gender}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Số điện thoại" size='large'
                  name='phone'
                  onChange={handleChangeInfo}
                  value={dataStaffChoose?.phone}
                />
              </div>
              <div className='mb-[20px]'>
                <Input
                  placeholder="Email" size='large'
                  name='email'
                  onChange={handleChangeInfo}
                  value={dataStaffChoose?.email}
                />
              </div>
            </div>}
        </Modal>
      </div>
    </Context.Provider >
  )
}

export default ManagerStaff