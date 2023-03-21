import { Card, Space, Tabs, TabsProps, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import ArsipSurat from './fragment/ArsipSurat';
import BuatSurat from './fragment/BuatSurat';
const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Buat Surat`,
      children: <BuatSurat/>,
    },
    {
      key: '2',
      label: `Arsip Surat`,
      children: <ArsipSurat/>,
    },
  ];
  
function Persuratan() {
  return (
    <Space direction="vertical">
        <Typography.Title level={3} style={{paddingLeft:15}}>Surat Tugas</Typography.Title>
        <Tabs defaultActiveKey="1" style={{paddingLeft:15}} items={items} onChange={onChange} />
    </Space>
  )
}

export default Persuratan