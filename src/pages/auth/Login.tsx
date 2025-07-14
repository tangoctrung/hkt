import { Input, notification } from 'antd'
import React, { useMemo, useState } from 'react'
import { LogoApp } from '../../assets/svg/LogoApp'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { DataLoginRequest } from '../../types/DataRequest';
import { validateEmail } from '../../utils';
const Context = React.createContext({ name: 'Default' });

function Login() {
  const [api, contextHolder] = notification.useNotification();
  const [messageNoti, setMessageNoti] = useState<string>("")
  const [dataLogin, setDataLogin] = useState<DataLoginRequest>({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch()
  const openNotificationFail = (placement: NotificationPlacement) => {
    api.error({
      message: `Thông báo Đăng nhập`,
      description: <Context.Consumer>{({ name }) => name}</Context.Consumer>,
      placement,
    });
  };
  const handleChangeInfo = (e: any) => {
    setDataLogin({
      ...dataLogin,
      [e?.target?.name]: e?.target?.value
    })
  }

  const validateForm = (data: any) => {
    if (data.email === "" || data.password === "") {
      return "Bạn chưa điền đầy đủ thông tin, hãy kiểm tra lại"
    }
    if (!validateEmail(data.email)) {
      return "Email không hợp lệ, hãy kiểm tra lại"
    }
    if (data.password?.length < 8) {
      return "Mật khẩu không hợp lệ, hãy kiểm tra lại"
    }
    return "";
  }

  const handleLogin = () => {
    let message: string = validateForm(dataLogin);
    if (message !== "") {
      setMessageNoti(message)
      openNotificationFail("topRight")
      return;
    }
    setIsLoading(true);
    navigate("/")
    // loginUser(dataLogin)
    //   .then((res) => {
    //     if (res?.status === 200) {
    //       let dataUser: any = res?.data?.data;
    //       let data: any = {
    //         userId: dataUser?.user?._id,
    //         accessToken: dataUser?.token,
    //         email: dataUser?.user?.email,
    //         avatar: dataUser?.user?.avatar,
    //         username: dataUser?.user?.username
    //       }
    //       dispatch(updateAuthUser(data))
    //       localStorage.setItem("accessToken", dataUser?.token)
    //       localStorage.setItem("userId", dataUser?.user?._id)
    //       navigate("/")
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setMessageNoti(err?.response?.data?.message)
    //     openNotificationFail("topRight")
    //     setIsLoading(false);
    //   })

  }
  const contextValue = useMemo(() => ({ name: messageNoti }), [messageNoti]);
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='w-[500px] h-fit rounded-lg p-5 formLogin' >
          <div className='w-full flex justify-center'>
            <div className='flex items-center'>
              <LogoApp />
              <p className='ml-3 font-semibold text-2xl'>Đăng nhập - HKT</p>
            </div>
          </div>
          <p className='italic text-gray-400 mt-2 text-center'>Đăng nhập hệ thống với tư cách admin hoặc quản lý</p>
          <div className='mt-[40px]'>
            <div className='flex justify-center'>
              <Input
                placeholder="Nhập username hoặc email"
                size='large' style={{ width: "80%", height: "50px" }}
                name='email'
                onChange={handleChangeInfo}
              />
            </div>
            <div className='mt-[20px] flex justify-center'>
              <Input.Password
                placeholder="Nhập password"
                size='large'
                style={{ width: "80%", height: "50px" }}
                name='password'
                onChange={handleChangeInfo}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </div>
          </div>
          <div className='mt-[30px] flex justify-center'>
            <Button
              type="primary" size='large'
              style={{ width: "40%", height: "50px" }}
              onClick={handleLogin}
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </Context.Provider >
  )
}

export default Login