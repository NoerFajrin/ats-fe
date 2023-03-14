import { Card, Col, Layout, Row, Space, Typography } from 'antd'
import { Content, Footer, Header, LayoutContext } from 'antd/es/layout/layout'
import Title from 'antd/es/typography/Title';
import React from 'react'

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#fff',
  backgroundColor: 'dark',
};

function TugasAktif() {
  return (
  <Space direction="vertical">
    <Header style={headerStyle}>
      <Typography.Title level={3} style={{color: '#fff', paddingTop:15}}></Typography.Title>
    </Header>
    <Space>
    <Typography.Title level={3} style={{paddingLeft:15}}>Tugas Aktif</Typography.Title>
    </Space>
    <Space direction="horizontal" size={16} style={{paddingBottom:15, paddingLeft:15, textAlign: 'center',}}>
      <Card title="Personel dalam Tugas"  style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
      </Card>
      <Card title="Kelompok dalam Tugas"  style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
      </Card>
  </Space>

  </Space>
  )
}

export default TugasAktif