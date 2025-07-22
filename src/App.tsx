import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeWork from './pages/HomeWork';
import Login from './pages/auth/Login';
import PageNotFound from './pages/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { TOKEN_FAKE } from './constant';
import { updateAuthUser } from './store/features/userSlice';
import Register from './pages/auth/Register';
import { getInfoUser } from './endpoint/auth';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// REACT_APP_API_URL=http://apigateway-xplat-sm.apps.xplat.fis.com.vn/
function App() {

  const { authUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch()
  const token = localStorage.getItem("accessToken") === "7f972857-a0a8-4d26-854b-9fc2735ed77a"

  const getMe = async () => {
    getInfoUser()
      .then((res) => {
        let dataUser: any = res?.data?.data;
        let data: any = {
          userId: dataUser?.user?._id,
          email: dataUser?.user?.email,
          avatar: dataUser?.user?.avatar,
          username: dataUser?.user?.username,
          accessToken: localStorage.getItem("accessToken") || TOKEN_FAKE
        }
        dispatch(updateAuthUser(data))
      })
      .catch((err) => {
        console.log({ err });
      })
  }

  useEffect(() => {
    const tokenLocal = localStorage.getItem("accessToken") || ""
    if (!authUser?.accessToken && tokenLocal) {
      getMe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
      <Route path="/" element={!token ? <Navigate to="/login" /> : <HomeWork />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
