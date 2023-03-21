import React, { useState } from 'react';
import { DashboardOutlined, FormOutlined, MenuUnfoldOutlined, MenuFoldOutlined,MailOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Image, MenuProps, Space, Typography } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';
import { useAppDispatch, useAppSelector } from '../../redux/Hook';
import { resetAuth } from '../../redux/Slice/AuthSlice';

const { Header, Content, Footer, Sider } = Layout;

const items2 :MenuProps['items'] = [
  {
    key: `tugas_aktif`,
    icon: React.createElement(DashboardOutlined),
    label: <Link to="/tugas-aktif">Tugas Aktif</Link> 
  },
  {
    key: `surat_tugas`,
    icon: React.createElement(MailOutlined),
    label: <Link to="/surat-tugas">Surat Tugas</Link> 
  },
  {
    key: `penugasan`,
    icon: React.createElement(FormOutlined),
    label: <Link to="/penugasan">Penugasan</Link> 
  },
  {
    key: `field_personel`,
    icon: React.createElement(UserOutlined),
    label: <Link to="/field-personel">Field Personel</Link> 
  },
]
const AdminLayout: React.FC = () => {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()

  const userFullName = user?.fullname;

  // if(!isLoggedIn){
  //   navigate('/login')
  // }

  const handleLogout = () => {
    dispatch(resetAuth());
  };
  const items: MenuProps["items"] = [
    {
      key: "name",
      label: userFullName,
      disabled: true,
    },
    {
      key: "1",
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];
  

  return (
    <Layout hasSider>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Space direction="horizontal" size="middle" style={{ display: 'flex', paddingLeft:20,paddingTop:10, justifyContent:'flex-start', alignItems:'center'}}>
       <img
         height={45} src={assets.images.lambang_korlantas}
       />
       <Typography.Title level={3} style={{color:'#f6ffed', paddingTop:12}}>ATS</Typography.Title>
      </Space>
      {/* <div style={{ height: 32, margin: 16, }} /> */}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items2} />
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header style={{ padding: 0, background: colorBgContainer }}>
      <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              height:'100%',
              paddingRight:30
            }}
          >
            <Dropdown menu={{ items }}>
              <Avatar size={"large"} />
            </Dropdown>
          </div>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Outlet/>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  );
};

export default AdminLayout;