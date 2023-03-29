import { Button, Col, Modal, Row, Space, Table } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import TextInput from '../Input/TextInput/TextInput';
import SingleSelect from '../Input/SelectInput/SelectInput';

type ModalPenugsanProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  width : string;
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
const PENANGGUNG_JAWAB = [
  { label: 'Kepala Divis A', value: 'Kepala Divis A' },
  { label: 'Kepala Divis B', value: 'Kepala Divis B' },
]
function ModalPenugasan({
  open,
  onOk,
  onCancel,
  width,
}: ModalPenugsanProps) {
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
  return (
      <Modal title="Basic Modal" open={open} onOk={onOk} onCancel={onCancel} width={width}>
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
          <Col>
          <Table rowSelection={rowSelection} columns={columns_personel} dataSource={listpersonel} />
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