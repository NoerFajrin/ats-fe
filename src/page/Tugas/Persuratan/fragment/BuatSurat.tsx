import { Button, Cascader, Col, DatePicker, Form, Input, InputNumber, notification, Popconfirm, Radio, Row, Select, Space, Switch, Tabs, TabsProps, TreeSelect, Typography, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { Option } from 'antd/es/mentions';
import { SingleSelect, TextInput } from '../../../../components';
import BasicDatePicker from '../../../../components/Input/DatePicker/DatePicker';
import { useFormik } from 'formik';
import TextAreaHere from '../../../../components/Input/TextAreaHere/TextInput';
import SuratSchema from '../../../../res/schema/Surat/Surat.schema';
import SuratServices from '../../../../services/SuratServices';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useNavigate } from 'react-router-dom';

type SizeType = Parameters<typeof Form>[0]['size'];

const JENIS_SURAT = [
  { label: 'SURAT TUGAS', value: 'SURAT_TUGAS' },
  { label: 'SURAT PERINTAH', value: 'SURAT_PERINTAH' },
]
const SUMBER_SURAT = [
  { label: 'Ka. Korlantas', value: 'ka_Korlantas' },
  { label: 'Ka. Polri', value: 'Ka_Polri' },
]


function BuatSurat({handleChange}: {handleChange: Function}) {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [api, contextHolder] = notification.useNotification();
  const [busy, setBusy] = useState<boolean>(false)
  const navigate = useNavigate()

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Surat berhasil dibuat`,
      description: 'berhasil menambahkan surat baru',
      placement,
    });
  };
  const errorNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Surat Tidak berhasil dibuat`,
      description: 'KKK',
      placement,
    });
  };
  const handleSubmit = async (payload: any) => {
    setBusy(true)
    try {
      console.log(payload);
      const formData = new FormData()
      for (const [key, value] of Object.entries(payload)) {
        formData.set(key, value as any)
      }
      const res = await SuratServices.CreateSurat(formData)
      openNotification('topRight')
      handleChange("2")
      setTimeout(() => navigate('/surat-tugas'), 3000)

    } catch (error) {
      console.error(error);
      errorNotification('topRight')
    }
  }
  const formik = useFormik({
    initialValues: {
      jenis_surat: '',
      nomor_surat: '',
      tanggal_surat: '',
      sumber_surat: '',
      nama_kegiatan: '',
      start_date: '',
      end_date: '',
      file: '',
      detail: '',
    },
    validationSchema: SuratSchema,
    onSubmit: handleSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  })


  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  return (
    <Space direction="vertical" size={'large'} style={{ width: "100%" }}>
      {contextHolder}
      <form onSubmit={formik.handleSubmit}>
        <Space direction="vertical" size={'small'} style={{ width: "100%" }}>
          <Row>
            <Space direction='vertical' size={'small'}>
              <Typography.Paragraph strong style={{ margin: 0 }}>Surat tugas fisik (PDF)</Typography.Paragraph>
              <input type={'file'} name={'file'} accept="application/pdf" onChange={(e) => {
                if (e.currentTarget.files) {
                  formik.setFieldValue('file', e.currentTarget?.files[0])
                }
              }} />
              <Typography style={{ color: 'red', fontSize: 11 }}>{formik.errors.file}</Typography>
            </Space>
          </Row>

          <Row gutter={36}>
            <Col span={6}>
              <SingleSelect label='Jenis Surat' options={JENIS_SURAT} onChange={(value) => formik.handleChange('jenis_surat')(value)} errorText={formik.errors.jenis_surat} />
            </Col>
            <Col span={6}>
              <TextInput label='Nomor Surat' value={formik.values.nomor_surat} onChange={formik.handleChange('nomor_surat')} errorText={formik.errors.nomor_surat} />
            </Col>
            <Col span={6}>
              <BasicDatePicker label='Tanggal Surat' onChange={(value, stringValue) => formik.handleChange('tanggal_surat')(stringValue)} errorText={formik.errors.tanggal_surat} />
            </Col>
          </Row>
          <Row gutter={36}>
            <Col span={6}>
              <SingleSelect label='Sumber Surat' options={SUMBER_SURAT} onChange={(value) => formik.handleChange('sumber_surat')(value)} errorText={formik.errors.sumber_surat} />
            </Col>
            <Col span={6}>
              <TextInput label='Nama Kegiatan' value={formik.values.nama_kegiatan} onChange={formik.handleChange('nama_kegiatan')} errorText={formik.errors.nama_kegiatan} />
            </Col>
            <Col span={6}>
              <BasicDatePicker label='Awal kegiatan' onChange={(value, stringValue) => formik.handleChange('start_date')(stringValue)} errorText={formik.errors.start_date} showTime />
            </Col>
            <Col span={6}>
              <BasicDatePicker label='Akhir kegiatan' onChange={(value, stringValue) => formik.handleChange('end_date')(stringValue)} errorText={formik.errors.end_date} showTime />
            </Col>
          </Row>
          <Row gutter={36}>
            <Col span={6}>
              <TextAreaHere label='Detail Kegiatan' value={formik.values.detail} onChange={formik.handleChange('detail')} errorText={formik.errors.detail} />
            </Col>
          </Row>
          <Popconfirm title={'Submit data'} description={'apakah data yang anda masukan sudah benar?'} onConfirm={formik.submitForm} okText={'Submit'} cancelText={'Batalkan'}>
            <Button style={{ backgroundColor: `#000000`, color: '#fff' }} disabled={busy}>Simpan Surat</Button>
          </Popconfirm>

        </Space>
      </form>
    </Space>

  )
}

export default BuatSurat