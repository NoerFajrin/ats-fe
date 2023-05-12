import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PenugasanServices from '../../../services/PenugasanServices'
import { Alert, Button, Card, Descriptions, List, Popconfirm, Space, Tag, Typography } from 'antd'
import moment from 'moment'
import { PENUGASAN } from '../../../res/peenugasan/penugasan.enum'

interface PenugasanInterface {
  id: string;
  nama_kegiatan: string;
  id_surat: string;
  catatan_penugasan: string;
  status: number;
  leader_id: string;
  created_at: string;
  updated_at: string;
  leader_profile: {
    id: string;
    fullname: string;
  };
  personels: {
    id: string;
    personel_id: string;
    created_at: string;
    user: {
      id: string;
      fullname: string;
    };
  }[];
  surat: {
    id: string;
    nomor_surat: string;
    sumber_surat: string;
    tanggal_surat: string;
    jenis_surat: string;
    start_date: string;
    end_date: string;
    file_url: string;
    nama_kegiatan: string;
    detail: string;
    created_at: string;
    updated_at: string;
  };
  todo: {
    id: string;
    name: string;
    description: string;
    penugasan_id: string;
    created_at: string;
    updated_at: string;
  }[];
}



const DetailPenugasan = () => {
  const { penugasanId } = useParams()
  const [penugasan, setPenugasan] = useState<PenugasanInterface | null>(null)

  const { Text, Title } = Typography

  const getPenugasan = async () => {
    try {
      if (penugasanId) {
        const res = await PenugasanServices.GetPenugasanById(penugasanId)
        const data = res.data.data as PenugasanInterface
        setPenugasan(data)
      }

    } catch (error) {
      console.error(error);

    }
  }
  const PenugasanTag = ({ status }: { status: number }) => {
    switch (status) {
      case PENUGASAN.DISPATCHED:
        return <Tag color='cyan'>BELUM BERLANGSUNG</Tag>
      case PENUGASAN.ONGOING:
        return <Tag color='red'>SEDANG BERLANGSUNG</Tag>
      case PENUGASAN.DONE:
        return <Tag color='green'>SELESAI</Tag>
      default:
        return <div />

    }
  }
  const handleFinishPenugasan = async () => {
    try {
      const res = await PenugasanServices.UpdatePenugasanStatus(penugasan?.id.toString() || '', 2)
      console.log(res.data.message);
      await getPenugasan()

    } catch (error) {
      console.error(error);

    }
  }
  useEffect(() => {
    getPenugasan()
  }, [])
  return (
    <Space style={{ minHeight: '88vh', width: '100%' }} direction='vertical' size={'large'}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>Detail Tugas</Title>
        {penugasan?.status === PENUGASAN.ONGOING ? <Popconfirm
          title="Selesaikan penugasan"
          description="Anda yakin akan menyelesaikan penugasan?"
          onConfirm={handleFinishPenugasan}
          onCancel={() => null}
          okText="Ya"
          cancelText="Tidak"
        >
          <Button type='primary' danger>Selesaikan Penugasan</Button>
        </Popconfirm> : <div />}
      </div>
      <Card>
        <Descriptions title="Informasi Penugasan">
          <Descriptions.Item label="Nama Kegiatan">{penugasan?.nama_kegiatan}</Descriptions.Item>
          <Descriptions.Item label="Surat Tugas">{<a onClick={() => window.open(penugasan?.surat.file_url, '_blank')}>{penugasan?.surat.nomor_surat}</a>}</Descriptions.Item>
          <Descriptions.Item label="Status">{<PenugasanTag status={penugasan?.status || 0} />}</Descriptions.Item>
          <Descriptions.Item label="Jadwal Kegiatan">{moment(penugasan?.surat.start_date).locale('id').format(`dddd, DD MMM YYYY hh:mm`)}</Descriptions.Item>
          <Descriptions.Item label="Koordinator Lapangan">{penugasan?.leader_profile.fullname}</Descriptions.Item>
        </Descriptions>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Title level={5}>Anggota Terlibat</Title>
          <Text>Jumlah anggota: {penugasan?.personels.length} anggota</Text>
          <List
            itemLayout='horizontal'
            bordered
            dataSource={penugasan?.personels}
            renderItem={(item) => (
              <List.Item
              >
                <Text>{item.user.fullname}</Text>
              </List.Item>
            )}
          />
        </Space>
        <Space direction='vertical' style={{ width: '100%', marginTop: 20 }} size={'small'}>
          <Title level={5}>Detail Aktivitas</Title>
          <Text>Jumlah aktivitas: {penugasan?.todo.length} aktivitas</Text>
          <List
            itemLayout='horizontal'
            bordered
            dataSource={penugasan?.todo}
            renderItem={(item) => (
              <List.Item>

                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Space>
        {
          penugasan?.catatan_penugasan && penugasan.catatan_penugasan !== '' &&
          <Space direction='vertical' style={{ width: '100%', marginTop: 20 }}>
            <Title level={5}>Catatan Penugasan</Title>
            <Alert message={penugasan?.catatan_penugasan} type='info' showIcon />
          </Space>
        }
      </Card >
    </Space >
  )
}

export default DetailPenugasan