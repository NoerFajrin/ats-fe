import { Card, Space, Tabs, TabsProps, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react'
import ArsipSurat from './fragment/ArsipSurat';
import BuatSurat from './fragment/BuatSurat';


  
function Persuratan() {
  const [activeKey, setActiveKey] = useState('2');
  const onChange = (key: string) => {
    setActiveKey(key)
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Buat Surat`,
      children: <BuatSurat handleChange={onChange} />,
    },
    {
      key: '2',
      label: `Arsip Surat`,
      children: <ArsipSurat/>,
    },
  ];
  return (
    <Space direction="vertical" style={{width:'100%', minHeight:'80vh'}}>
        <Typography.Title level={3} style={{paddingLeft:15}}>Surat Tugas</Typography.Title>
        <Tabs activeKey={activeKey} style={{paddingLeft:15}} items={items} onChange={onChange} />
    </Space>
  )
}

export default Persuratan