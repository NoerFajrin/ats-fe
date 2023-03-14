import React from 'react';
import { DashboardOutlined, FormOutlined, LaptopOutlined, NotificationOutlined,MailOutlined, UserOutlined } from '@ant-design/icons';
import { Image, MenuProps, Space, Typography } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import assets from '../../assets/assets';

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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      <Space direction="horizontal" size="middle" style={{ display: 'flex', paddingLeft:2,paddingTop:4}}>
       <img
         height={45} src={assets.images.lambang_korlantas}
       />
       <Typography.Text style={{color:'#f6ffed'}}>ATS</Typography.Text>
      </Space>
      {/* <div style={{ height: 32, margin: 16, }} /> */}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items2} />
    </Sider>
    
    <Layout className="site-layout" style={{ marginLeft: 200,  }}> 
    <Outlet/>
      <Footer style={{ textAlign: 'center', background: colorBgContainer}}>@2023 PT. Kreasi Rekayasa Indonesia</Footer>
    </Layout>
  </Layout>
  );
};

export default AdminLayout;