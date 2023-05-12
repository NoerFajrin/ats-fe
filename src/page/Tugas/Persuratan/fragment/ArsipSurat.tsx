import { Button, Col, FloatButton, Modal, Popconfirm, Row, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import SuratServices from '../../../../services/SuratServices'
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment'
import { ModalPenugasan, SingleSelect } from '../../../../components';
import { useFormik } from 'formik';
import ModalResult from '../../../../components/ModalResult/ModalResult';
import { useNavigate } from 'react-router-dom';


interface SuratInterface {
  id: number | string,
  created_at: string,
  detail: string,
  end_date: string,
  file_url: string,
  jenis_surat: string,
  nama_kegiatan: string,
  nomor_surat: string,
  start_date: string,
  tanggal_surat: string,
  penugasan: any | null
}

function ArsipSurat() {
  const navigation = useNavigate();

  const [surat, setSurat] = useState<SuratInterface[]>([])
  const [idSuratTugas, setIdSuratTugas] = useState<number | string>(0);

  const JENIS_SURAT = [
    { label: 'Sudah Memiliki Penugasan', value: 'sudah_penugasan' },
    { label: 'Belum Memiliki Penugasan', value: 'belum_penugasan' },
  ]

  const getSurat = async () => {
    try {
      const res = await SuratServices.ListSurat();
      console.log(res);
      setSurat(res.data.data.data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSurat();
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id: number | string) => {
    setIdSuratTugas(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    getSurat();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  }
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
      render: (data: string) => moment(data).format('DD/MM/YYYY'),
    },
    {
      title: 'Awal Kegiatan',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (data: string) => moment(data).format('DD/MM/YYYY hh:mm'),
    },
    {
      title: 'Akhir Kegiatan',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (data: string) => moment(data).format('DD/MM/YYYY hh:mm')
    },
    {
      title: 'Aksi',
      dataIndex: 'id',
      key: 'action',
      render: (_:any, data: SuratInterface) => {
        return (
          <Space direction='vertical'>
            <Button block icon={<EditOutlined />}>Edit</Button>
            <Button block icon={<EyeOutlined />} onClick={() => {
              window.open(data.file_url, '_blank')
            }}>Lihat Surat Fisik</Button>
            {
              data.penugasan ?
                <Button block danger onClick={() => navigation(`/penugasan/detail/${data.penugasan.id}`)}>
                  Lihat Penugasan
                </Button>
                :
                <Button block onClick={() => showModal(data.id)} type="primary">
                  Buat Penugasan
                </Button>
            }

          </Space>
        );
      }
    },
  ]

  return (

    <Space direction='vertical' style={{ width: '100%' }}>
      <Row style={{ width: '50%' }}>
        <SingleSelect label='Jenis Surat' options={JENIS_SURAT} onChange={(value) => handleChange} errorText={""} />
      </Row>
      <Table dataSource={surat} columns={columns} />
      <ModalPenugasan open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={'80%'} idSuratTugas={idSuratTugas} />

    </Space>
  )
}

export default ArsipSurat