import { Button, Col, FloatButton, Modal, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import SuratServices from '../../../../services/SuratServices'
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment'
import { Form } from 'react-router-dom';
import { useFormik } from 'formik';
import { SingleSelect, TextInput } from '../../../../components';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';

interface DataPersonel {
  key: React.Key;
  id:number | string;
  nama_personel: string;
  nama_satuan: string;
}
const columns_personel: ColumnsType<DataPersonel> = [
  {
    title: 'ID Personel',
    dataIndex: 'id',
  },
  {
    title: 'Nama Personel',
    dataIndex: 'nama_personel',
  },
  {
    title: 'Nama_Satuan',
    dataIndex: 'nama_satuan',
  },
];
const listpersonel: DataPersonel[] = [];
for (let i = 0; i < 46; i++) {
  listpersonel.push({
    key: i,
    id: `${i}`,
    nama_personel: 'Wayne Rooney 11',
    nama_satuan: `Red ${i}`,
  });
}
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
const PENANGGUNG_JAWAB = [
  { label: 'Kepala Divis A', value: 'Kepala Divis A' },
  { label: 'Kepala Divis B', value: 'Kepala Divis B' },
]

function ArsipSurat() {
  const [surat , setSurat] = useState <SuratInterface[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataPersonel> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
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
  const handleSubmit = async (payload: any) => { console.log("halo");}
  const formik = useFormik({
    initialValues: {
      penanggung_jawab: '',
      jumlah_personel:'',
    },
    onSubmit: handleSubmit
  })
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
            <Modal title="Buat Penugasan" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='80%'>
              <Space direction="vertical" style={{width: '100%'}}>
              <Space>
              <form>
              <Row gutter={36}>
              <Col >
              <SingleSelect label='Penanggung Jawab' options={PENANGGUNG_JAWAB} onChange={(value) => formik.handleChange('penanggung_jawab')(value)} errorText={formik.errors.penanggung_jawab} />
              </Col>
              <Col>
              <TextInput label='Jumlah Personel' value={formik.values.jumlah_personel} onChange={formik.handleChange('jumlah_personel')} errorText={formik.errors.jumlah_personel} />
              </Col>
              </Row>
              <Row gutter={36}>
                <Col><Table rowSelection={rowSelection} columns={columns_personel} dataSource={listpersonel} /></Col>
                <Col> List Personel yang terpilih</Col>
                <Col>  <Button type="primary">Kirim Penugasan ke Personel</Button></Col>
              </Row>
                            
              </form>
              </Space> 
              </Space> 
            </Modal>
          </Space>
  
        );
  
      }
      
    },
  ]

  return (
    <div>
      <Table dataSource={surat} columns={columns} />;
      
    </div>
  )
}

export default ArsipSurat