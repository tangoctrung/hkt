import React, { useState } from 'react'
import { InsertRowAboveOutlined, UserSwitchOutlined, DotChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Button } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthUser } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { NO_AVATAR } from '../../endpoint/config';
import DashboardGA from '../DashboardGA';
import ReportUser from '../ReportUser';
import ReportOther from '../ReportOther';

type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const HomeWork: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { authUser } = useSelector((state: RootState) => state.user);

  const [tab, setTab] = useState<string>("2")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem('Tổng quan nhanh', '2', <InsertRowAboveOutlined />),
    getItem('Báo cáo người dùng', '3', <UserSwitchOutlined />),
    getItem('Báo cáo khác', '4', <DotChartOutlined />),
  ];
  const handleSwitchTab = (e: any) => {
    setTab(e?.key)
  }

  const handleLogout = () => {
    let data: any = {
      userId: "",
      accessToken: "",
      email: "",
    }
    dispatch(updateAuthUser(data))
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userId")
    navigate("/login")
  }
  const displayTitleTab = () => {
    switch (tab) {
      case "2":
        return "Tổng quan nhanh"
      case "3":
        return "Báo cáo người dùng"
      case "4":
        return "Báo cáo khác"
      default:
        return "Hệ thống"
    }
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={300}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ padding: "20px", maxWidth: "300px" }}
      >
        <div className="mb-[20px] flex flex-col items-center text-white">
          <img src={authUser?.avatar || NO_AVATAR} alt='avatar' className='w-20 h-20 rounded-full object-cover' />
          <b className='text-lg'>{authUser?.username || "admin"}</b>
          <p>Chào mừng bạn trở lại</p>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['2']}
          items={items}
          onClick={handleSwitchTab}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <div className='w-full h-full flex justify-between px-10'>
            <div className='flex items-center text-xl font-semibold'>
              {displayTitleTab()}
            </div>
            <div className='flex items-center'>
              <Button
                type='primary'
                onClick={handleLogout}
              >Đăng xuất</Button>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: colorBgContainer }} className="h-[calc(100vh-100px)]">
            {tab === "2" && <DashboardGA />}
            {tab === "3" && <ReportUser />}
            {tab === "4" && <ReportOther />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeWork;