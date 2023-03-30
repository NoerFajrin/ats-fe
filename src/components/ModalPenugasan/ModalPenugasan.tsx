import { Button, Col, Modal, Row, Space, Table, Typography } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import TextInput from '../Input/TextInput/TextInput';
import SuratServices from '../../services/SuratServices';
import moment from 'moment';

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

type ModalPenugsanProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  width : string;
  idSuratTugas: number | string;
};

interface DataPersonel {
  key: React.Key;
  id: number | string;
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

function ModalPenugasan({
  open,
  onOk,
  onCancel,
  width,
  idSuratTugas,
}: ModalPenugsanProps) {

  const [suratSelect , setSuratSelect] = useState <SuratInterface | null>(null)
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

  const handleSubmit = async (payload: any) => { console.log("halo"); }

  const formik = useFormik({
    initialValues: {
      penanggung_jawab: '',
      jumlah_personel: '',
    },
    onSubmit: handleSubmit
  })

  const getSuratById = async ()=>{
    try {
      const res = await SuratServices.SuratById(idSuratTugas);
      console.log(res.data.data);
      setSuratSelect(res.data.data);
    
  } catch (error) {
    console.error(error);
  }}

  useEffect(()=>{
    getSuratById();
  },
  [idSuratTugas])
  
  return (
      <Modal title="Penugasan" open={open} onOk={onOk} onCancel={onCancel} width={width} >
        <Space direction='vertical'>
        <Row gutter={36}>
          <Col span={5}> <Typography.Text> Nomor Surat</Typography.Text> </Col>
          <Col> <Typography.Text>{suratSelect?.nomor_surat}</Typography.Text> </Col>
        </Row>
        <Row gutter={36}>
          <Col span={5}> <Typography.Text> Perihal Surat</Typography.Text> </Col>
          <Col> <Typography.Text> {suratSelect?.nama_kegiatan}</Typography.Text> </Col>
        </Row>
        <Row gutter={36}>
          <Col span={5}> <Typography.Text> Waktu Pelaksanaan</Typography.Text> </Col>
          <Col> <Typography.Text> {moment(suratSelect?.start_date).format('DD/MM/YYYY hh:mm')} s.d {moment(suratSelect?.end_date).format('DD/MM/YYYY hh:mm')}</Typography.Text>  </Col>
        </Row>
          
        <form>
        <Row gutter={36}>
          <Col>
            <TextInput label='Jumlah Personel' value={formik.values.jumlah_personel} onChange={formik.handleChange('jumlah_personel')} errorText={formik.errors.jumlah_personel} />
          </Col>
        </Row>
        <Row gutter={36} style={{marginTop:30}}>
          <Col>
          <Table  rowSelection={rowSelection} columns={columns_personel} dataSource={listpersonel} />
          </Col>
          <Col> List Personel yang terpilih</Col>
          <Col>  <Button type="primary">Kirim Penugasan ke Personel</Button></Col>
        </Row>
      </form>
        </Space>
      </Modal>
  )
}

export default ModalPenugasan