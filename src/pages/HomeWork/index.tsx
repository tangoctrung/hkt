import React, { useEffect, useRef, useState } from 'react'
import { InsertRowAboveOutlined, UserSwitchOutlined, DotChartOutlined, RollbackOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Button } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateAuthUser } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import DashboardGA from '../DashboardGA';
import ReportUser from '../ReportUser';
import ReportOther from '../ReportOther';
import Retention from '../Retention';
import LogoApp from "../../assets/images/logo.png";


type MenuItem = Required<MenuProps>['items'][number];
const { Header, Content, Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  title?: string | null,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    title,
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
  const [collapsed, setCollapsed] = useState(true);
  const [tab, setTab] = useState<string>("2")

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem('Quick overview', '2', <InsertRowAboveOutlined />, null),
    getItem('Retention', '3', <RollbackOutlined />, null),
    getItem('User report', '4', <UserSwitchOutlined />, null),
    getItem('Other reports', '5', <DotChartOutlined />, null),
  ];
  const siderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        siderRef.current &&
        !siderRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true);
      }
    };

    if (!collapsed) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed]);

  const handleSwitchTab = (e: any) => {
    setCollapsed(true)
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
        return "Quick overview"
      case "3":
        return "Retention"
      case "4":
        return "User report"
      case "5":
        return "Other reports"
      default:
        return "System"
    }
  }

  return (
    <Layout style={{ height: "100vh", position: 'relative' }}>
      <Sider
        ref={siderRef}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={0}
        width={260}
        style={{
          padding: "20px",
          maxWidth: "200px",
          position: "absolute",
          height: "100vh",
          zIndex: 1000,
          left: 0,
          top: 0,
        }}
      >
        <div className="mb-[20px] flex flex-col items-center text-white">
          <img src={authUser?.avatar || LogoApp} alt='avatar' className='w-20 h-20 rounded-full object-cover' />
          <b className='text-lg'>{authUser?.username || "admin"}</b>
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
            <div className='flex items-center text-xl font-semibold px-6'>
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
        <Content style={{ margin: '0 0 0 30px' }}>
          <div className='h-[calc(100vh-66px)]'>
            <div style={{ background: "#edf0ef" }} className="px-[5%] h-full overflow-y-scroll viewScroll">
              {tab === "2" && <DashboardGA />}
              {tab === "3" && <Retention />}
              {tab === "4" && <ReportUser />}
              {tab === "5" && <ReportOther />}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeWork;