import { Space, Table, Tabs, TabsProps, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import PenugasanServices from '../../../services/PenugasanServices';
import moment from 'moment';

interface LeaderInterface{
  fullname:string,
  id:string,
} 
interface PersonelInterface{
  user:{
    fullname:string,
    id:number|string,
  }
}
interface SuratInterface{
  surat:{
    id:string,
    start_date:string,
    end_date:string,
  }
}

interface PenugasanInterface {
  id: number | string,
  catatan_penugasan:string,
  created_at:string,
  id_surat: number | string,
  leader_id:string,
  leader_profile:LeaderInterface,
  nama_kegiatan:string,
  status:number|string,
  update_at:string,
  surat:SuratInterface,
  personels:PersonelInterface,
  jumlah_personels:number | string,
}
  
function Penugasan() {
  const [penugasan, setPenugasan] = useState<PenugasanInterface[]>([])

  
  const getPenugasan = async () => {
    try {
      const res = await PenugasanServices.ListPenugasan();
      console.log(res.data.data.data);
      setPenugasan(res.data.data.data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPenugasan();
  }, [])
  const columns = [
    // {
    //   title: 'Nomor Penugasan',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Nama Kegiatan',
      dataIndex: 'nama_kegiatan',
      key: 'nama_kegiatan',
    },
    {
      title: 'Leader Name',
      dataIndex: 'leader_profile',
      key: 'leader_profile',
      render: (data: string)=>data.fullname,
    },
    {
      title: 'Tanggal Mulai',
      dataIndex: 'surat',
      key: 'surat',
      render: (data: string)=>moment(data.start_date).format('DD/MM/YYYY hh:mm'),
    },
    {
      title: 'Tanggal Selsai',
      dataIndex: 'surat',
      key: 'surat',
      render: (data: string)=>moment(data.end_date).format('DD/MM/YYYY hh:mm'),
    },
    {
      title: 'Jumlah Personel',
      dataIndex: 'personels',
      key: 'personels',
      render: (data: number | string) => `${data.length} Personels`  
    },
  ]
  return (
    <Space direction="vertical" style={{width: '100%'}}>
        <Typography.Title level={3} style={{paddingLeft:15}}>Penugasan</Typography.Title>
        <Table dataSource={penugasan} columns={columns} />
    </Space>
  )
}
export default Penugasan