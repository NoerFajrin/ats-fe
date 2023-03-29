import { Button, Col, FloatButton, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import SuratServices from '../../../../services/SuratServices'
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment'
import { ModalPenugasan } from '../../../../components';


interface SuratInterface {
  id : number | string,
  created_at : string,
  detail : string,
  end_date : string,
  file_url : string,
  jenis_surat : string,
  nama_kegiatan : string,
  nomor_surat : string,
  start_date : string,
  tanggal_surat : string,
} 


function ArsipSurat() {
  const [surat , setSurat] = useState <SuratInterface[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const getSurat = async ()=>{
    try {
      const res = await SuratServices.ListSurat();
      console.log(res.data.data);
      setSurat(res.data.data);
    
  } catch (error) {
    console.error(error);
  }}

  useEffect(()=>{
    getSurat();
  },[])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  const columns = [
    {
      title: 'Nomor Surat',
      dataIndex: 'nomor_surat',
      key: 'nomor_surat',
    },
    {
      title: 'Jenis Surat',
      dataIndex: 'jenis_surat',
      key: 'jenis_surat',
    },
    {
      title: 'Kegiatan',
      dataIndex: 'nama_kegiatan',
      key: 'nama_kegiatan',
    },
    {
      title: 'Tanggal Surat',
      dataIndex: 'tanggal_surat',
      key: 'tanggal_surat',
      render:(data : string)=>moment(data).format('DD/MM/YYYY'),
    },
    {
      title: 'Awal Kegiatan',
      dataIndex: 'start_date',
      key: 'start_date',
      render:(data : string)=>moment(data).format('DD/MM/YYYY hh:mm'),
    },
    {
      title: 'Akhir Kegiatan',
      dataIndex: 'end_date',
      key: 'end_date',
      render:(data : string)=>moment(data).format('DD/MM/YYYY hh:mm')
    },
    {
      title: 'Aksi',
      dataIndex: 'id',
      key: 'action',
      render:(data : number | string)=>{
        return(
          <Space direction='vertical'>
            <Button icon={<EditOutlined/>}>Edit</Button>
            <Button icon={<EyeOutlined />}>Lihat Surat Fisik</Button>
            <Button type="primary" onClick={showModal}>
            Buat Penugasan
            </Button>
          </Space>
        );
      }
    },
  ]

  return (
    <div>
      <Table dataSource={surat} columns={columns} />;
      <ModalPenugasan open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={'80%'}/>
    </div>
  )
}

export default ArsipSurat