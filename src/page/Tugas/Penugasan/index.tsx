import { Space, Tabs, TabsProps, Typography } from 'antd'
import React from 'react'
import BuatPenugasan from './fragment/BuatPenugasan';
import RiwayatPenugasan from './fragment/RiwayatPenugasan';

const onChange = (key: string) => {
    console.log(key);
  };

const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Buat Penugasan`,
      children: <BuatPenugasan/>,
    },
    {
      key: '2',
      label: `Riwayat Penugasan`,
      children: <RiwayatPenugasan/>,
    },
];
  
function Penugasan() {
  return (
    <Space direction="vertical" style={{width: '100%'}}>
        <Typography.Title level={3} style={{paddingLeft:15}}>Penugasan</Typography.Title>
        <Tabs defaultActiveKey="1" style={{paddingLeft:15}} items={items} onChange={onChange} />
    </Space>
  )
}
export default Penugasan