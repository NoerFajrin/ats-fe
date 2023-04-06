import { Button, Checkbox, Col, Modal, Popconfirm, Popover, Row, Space, Statistic, Table, Typography } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import TextInput from '../Input/TextInput/TextInput';
import SuratServices from '../../services/SuratServices';
import moment from 'moment';
import { string } from 'yup';
import PersonelServices from '../../services/PersonelServices';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import TextAreaHere from '../Input/TextAreaHere/TextInput';
import PenugasanServices from '../../services/PenugasanServices';

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
}

type ModalPenugsanProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  width: string;
  idSuratTugas: number | string;
};

interface DataPersonel {
  key: React.Key;
  id: number | string;
  nama_personel: string;
}

function ModalPenugasan({
  open,
  onOk,
  onCancel,
  width,
  idSuratTugas,

}: ModalPenugsanProps) {

  const [selectedSurat, setselectedSurat] = useState<SuratInterface | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');
  const [selectedEndtDate, setSelectedEndDate] = useState<string>('');
  const [selectedPersonelList, setSelectedPersonelList] = useState<DataPersonel[]>([]);
  const [listPersonel, setListPersonel] = useState<DataPersonel[]>([])


  const handleSubmit = async (payload: any) => { console.log("halo"); }

  const handleChecklistPersonel = (e: CheckboxChangeEvent) => {
    const idPersonelSelected = e.target.value;
    const selectedPersonel = listPersonel.find((personel: DataPersonel) => Number(personel.id) === Number(idPersonelSelected))
    console.log(selectedPersonel, e.target.checked);
    if (selectedPersonel !== undefined) {
      // setSelectedPersonelList([...selectedPersonelList,selectedPersonel])
      const updatedSelectedPersonelList = selectedPersonelList.map((personel: any) => {
        if (Number(personel.id) === Number(idPersonelSelected)) {
          return { ...personel, isChecked: e.target.checked }
        }
        return { ...personel }
      })
      setSelectedPersonelList(updatedSelectedPersonelList)
    }
  }

  const formik = useFormik({
    initialValues: {
      penanggung_jawab: '',
      jumlah_personel: '',
      catatan_penugasan: '',
    },
    onSubmit: handleSubmit
  })

  const getSuratById = async () => {
    try {
      const res = await SuratServices.SuratById(idSuratTugas);
      let resStartDate = moment(res.data.data.start_date).format('YYYY-MM-DD hh:mm:ss');
      let resEndDate = moment(res.data.data.end_date).format('YYYY-MM-DD hh:mm:ss');
      console.log(resEndDate);
      setSelectedStartDate(resStartDate);
      setSelectedEndDate(resEndDate);
      setselectedSurat(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const getAvailablePersonel = async () => {
    try {
      const res = await PersonelServices.AvailablePersonel(selectedStartDate, selectedEndtDate);
      const rawData = res.data.data.data
      setListPersonel(rawData);
      const rawUncheckedPersonelList = rawData.map((personel: DataPersonel) => ({ ...personel, isChecked: false }))
      setSelectedPersonelList(rawUncheckedPersonelList)
    } catch (error) {
      console.error(error);
    }
  }

  const handleSendPenugasan = async () => {
    const selectedID = selectedPersonelList.filter((personel: any) => personel.isChecked).map((personel: any) => ({ id: personel.id }))
    const payload = {
      id_surat: Number(selectedSurat?.id),
      nama_kegiatan: selectedSurat?.nama_kegiatan,
      catatan_penugasan: formik.values.catatan_penugasan,
      leader_id: Number(selectedID[0]),
      list_personel: selectedID,
    }
    try {
      const res = await PenugasanServices.CreatePenugasan(payload)
      console.log(res.data);
      onCancel()
    } catch (error) {
      console.error(error);

    }
  }

  const columns_personel: ColumnsType<DataPersonel> = [
    {
      title: 'Nama Personel',
      dataIndex: 'fullname',
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
    },
    {
      title: 'Pilih',
      dataIndex: 'id',
      render: (data: number | string) => {
        return (
          <Checkbox value={data} onChange={handleChecklistPersonel}></Checkbox>
        );
      }
    },

  ];
  const columns_personel_selected = [
    {
      title: 'Nama Personel Terpilih',
      dataIndex: 'fullname',
    },
    {
      title: 'Satuan',
      dataIndex: 'satuan',
    },

  ];
  useEffect(() => {
    getSuratById();
    getAvailablePersonel();
  },
    [idSuratTugas]),



    useEffect(() => { console.log(selectedPersonelList) }, [selectedPersonelList]);

  return (
    <Modal title="" open={open} onOk={onOk} onCancel={onCancel} width={width} >
      <Space direction='vertical'>
        <Row gutter={16} style={{ marginTop: 30 }}>
          <Col span={6}>
            <Statistic title="Nomor Surat" value={selectedSurat?.nomor_surat} />
          </Col>
          <Col span={6}>
            <Statistic title="Perihal Surat" value={selectedSurat?.nama_kegiatan} />
          </Col>
          <Col span={6}>
            <Statistic title="Tanggal Mulai" value={moment(selectedSurat?.start_date).format('DD/MM/YYYY hh:mm')} />
          </Col>
          <Col span={6}>
            <Statistic title="Tanggal Selsai" value={moment(selectedSurat?.end_date).format('DD/MM/YYYY hh:mm')} />
          </Col>
        </Row>

        <form>
          <Row gutter={36} style={{ marginTop: 30 }}>
            <Col>
              <TextInput label='Jumlah Personel' value={formik.values.jumlah_personel} onChange={formik.handleChange('jumlah_personel')} errorText={formik.errors.jumlah_personel} />
            </Col>
          </Row>
          <Row gutter={36} style={{ marginTop: 30 }}>
            <Col span={24}>
              <TextAreaHere label='Catatan Penugasan' value={formik.values.catatan_penugasan} onChange={formik.handleChange('catatan_penugasan')} errorText={formik.errors.catatan_penugasan} />
            </Col>
          </Row>
          <Row gutter={36} style={{ marginTop: 30 }}>
            <Col span={12}>
              <Table columns={columns_personel} dataSource={listPersonel} />
            </Col>
            <Col span={12}>
              <Table pagination={false} dataSource={selectedPersonelList.filter((personel: any) => personel.isChecked === true)} columns={columns_personel_selected} />
            </Col>
            <Col>
              <Popconfirm placement="top" title={"Apakah anda yakin akan mensubmit data?"} onConfirm={handleSendPenugasan}>
                <Button type="primary">Kirim Penugasan ke Personel</Button>
              </Popconfirm>
            </Col>
          </Row>
        </form>
      </Space>
    </Modal>
  )
}

export default ModalPenugasan