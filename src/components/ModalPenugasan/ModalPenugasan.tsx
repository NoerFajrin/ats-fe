import { Button, Checkbox, Col, List, Modal, Popconfirm, Popover, Row, Space, Statistic, Table, Typography } from 'antd';
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
import ModalResult from '../ModalResult/ModalResult';
import SelectSearch from '../Input/SelectSearch';
import useDebounce from '../../hooks/debounce';
import UserServices from '../../services/UserService';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
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
interface ResultInterface {
  open: boolean;
  status: "success" | "info" | "error";
  title: string;
  subTitle: string;

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
  isChecked?: boolean;
}

interface Acivity {
  name: string,
  description: string,
  key: string
}

function ModalPenugasan({
  open,
  onOk,
  onCancel,
  width,
  idSuratTugas,

}: ModalPenugsanProps) {

  const [selectedSurat, setselectedSurat] = useState<SuratInterface | null>(null);
  const [selectedPersonelList, setSelectedPersonelList] = useState<DataPersonel[]>([]);
  const [listPersonel, setListPersonel] = useState<DataPersonel[]>([])
  const [resultModalProperty, setResulmodalProperty] = useState<ResultInterface>({
    open: false,
    status: 'success',
    title: 'Selamat',
    subTitle: 'ok'
  });
  const [query, setQuery] = useState<string>('')
  const [bounceBusy, setBounceBusy] = useState<boolean>(false)
  const [leaderSearchList, setLeaderSearchList] = useState([])
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | number>(0)
  const [activeActivity, setActiveActivity] = useState<Acivity>({ name: '', description: '', key: '' })
  const [activityList, setActivityList] = useState<Acivity[]>([])

  const searchQuery = useDebounce(query, 1000);
  const handleNameSearch = async (input: string) => {
    const res = await UserServices.findUser(1, 10, input)
    const data = res.data.data.data
    const formattedData = data.map(user => ({ value: user.id, label: user.fullname }))
    setLeaderSearchList(formattedData)

  }
  const handleChangeInput = (input: string) => {
    setQuery(input);
    setBounceBusy(true)
  }

  const handlePickLeader = (value: any) => {
    setSelectedLeaderId(Number(value))

  }

  useEffect(() => {
    handleNameSearch(query);
    setBounceBusy(false)
  }, [searchQuery])


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
      setselectedSurat(res.data.data);
      getAvailablePersonel(resStartDate, resEndDate);
    } catch (error) {
      console.error(error);
    }
  }

  const getAvailablePersonel = async (startDate: string, endDate: string) => {
    try {
      const res = await PersonelServices.AvailablePersonel(startDate, endDate);
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
      leader_id: Number(selectedLeaderId),
      list_personel: [{id:selectedLeaderId},...selectedID],
      todo: activityList.map((activity:Acivity)=> ({name:activity.name,description:activity.description}))
    }    
    try {
      const res = await PenugasanServices.CreatePenugasan(payload)
      const successMsg = res.data.data.message
      setResulmodalProperty({ open: true, status: "success", title: "Berhasil Membuat Penugasan", subTitle: successMsg })
      console.log(res.data);
      onOk()
    } catch (error) {
      const errorMsg = error?.response?.data?.error?.response?.error || "";
      setResulmodalProperty({ open: true, status: "error", title: "Tidak Dapat Memproses Data", subTitle: errorMsg })
      console.error(error);

    }
  }
  const handleOk = async () => {
    const updateModal = new Promise(resolve => {
      setResulmodalProperty({ ...resultModalProperty, open: false })
      resolve(true)
    })
    await updateModal
    if (resultModalProperty.status === 'success') {
      onCancel()
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
      render: (data: number | string, row) => {
        // console.log(data, row);

        return (
          <Checkbox value={row.id} onChange={handleChecklistPersonel} disabled={selectedPersonelList.filter(p => p.isChecked).length >= Number(formik.values.jumlah_personel) && !row.isChecked} checked={row.isChecked}></Checkbox>
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
    console.log("aku terpanggil")
  },
    [idSuratTugas]),

    useEffect(() => { console.log(selectedPersonelList) }, [selectedPersonelList]);

  return (
    <Modal title="" open={open} onOk={onOk} onCancel={onCancel} width={width}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Popconfirm placement="top" title={"Apakah anda yakin akan mensubmit data?"} onConfirm={handleSendPenugasan}>
          <Button type="primary">Kirim Penugasan ke Personel</Button>
        </Popconfirm>,
      ]}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row gutter={16} style={{ marginTop: 30 }}>
          <Col span={6}>
            <Statistic title="Nomor Surat" value={selectedSurat?.nomor_surat} />
          </Col>
          <Col span={6}>
            <Statistic title="Perihal Surat" value={selectedSurat?.nama_kegiatan} />
          </Col>
          <Col span={6}>
            <Statistic title="Tanggal Mulai" value={moment(selectedSurat?.start_date).format('DD/MM/YY hh:mm')} />
          </Col>
          <Col span={6}>
            <Statistic title="Tanggal Selsai" value={moment(selectedSurat?.end_date).format('DD/MM/YY hh:mm')} />
          </Col>
        </Row>

        <form>
          <Row gutter={36} style={{ marginTop: 30 }}>
            <Col span={18}>
              <SelectSearch options={leaderSearchList} onChange={handlePickLeader} label={'Ketua Penugasan'} onSearch={handleChangeInput} />
            </Col>
            <Col span={6}>
              <TextInput number label='Jumlah Personel' value={formik.values.jumlah_personel} onChange={formik.handleChange('jumlah_personel')} errorText={formik.errors.jumlah_personel} />
            </Col>
          </Row>
          <Row gutter={36} style={{ marginTop: 30 }}>
            <Col span={12}>
              <Table columns={columns_personel} dataSource={selectedPersonelList.filter((personel: any) => Number(personel.id) !== Number(selectedLeaderId))} />
            </Col>
            <Col span={12}>
              <Table pagination={false} dataSource={selectedPersonelList.filter((personel: any) => personel.isChecked === true)} columns={columns_personel_selected} />
            </Col>
          </Row>
          <Typography.Title level={5} style={{ marginTop: 15, marginBottom: 10 }}>
            Detail Aktivitas
          </Typography.Title>
          {
            activityList.length > 0 && <List
              itemLayout='horizontal'
              bordered
              dataSource={activityList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type='text'
                      onClick={() => {
                        const newList = activityList.filter((activity: Acivity) => activity.key !== item.key)
                        setActivityList(newList)
                        setActiveActivity({name:'',description:'',key:''})
                      }}
                      danger
                      icon={<DeleteOutlined />}
                    >
                      Hapus
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={item.description}
                  />
                </List.Item>
              )}
              style={{ marginBottom: 15 }}
            />
          }
          <Row gutter={36}>
            <Col span={8}>
              <TextInput label='Nama Aktivitas' onChange={(e) => setActiveActivity({ ...activeActivity, name: e.target.value })} value={activeActivity.name} placeholder='Masukan aktivitas' />
            </Col>
            <Col span={12}>
              <TextInput label='Deskripsi' onChange={(e) => setActiveActivity({ ...activeActivity, description: e.target.value })} value={activeActivity.description} placeholder='Masukan deskripsi singkat mengenai aktivitas' />
            </Col>
            <Col span={4}>
              <Button
                icon={<PlusOutlined />}
                type={'primary'}
                style={{ marginTop: 22 }}
                onClick={() => {
                  const key = `a-${moment().unix()}`
                  setActivityList([...activityList, { ...activeActivity, key }])
                }}>Tambah Aktivitas</Button>
            </Col>
          </Row>
          <Row gutter={36} style={{ marginTop: 30 }}>
            <Col span={24}>
              <TextAreaHere label='Catatan Penugasan' value={formik.values.catatan_penugasan} onChange={formik.handleChange('catatan_penugasan')} errorText={formik.errors.catatan_penugasan} />
            </Col>
          </Row>
        </form>
      </Space>
      <ModalResult onOk={handleOk} open={resultModalProperty.open} status={resultModalProperty.status} title={resultModalProperty.title} subTitle={resultModalProperty.subTitle} ></ModalResult>
    </Modal>
  )
}

export default ModalPenugasan