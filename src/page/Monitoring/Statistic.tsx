import { Card, Col, Row, Space, Typography, Statistic as Stat, Table, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MonitoringService from '../../services/MonitoringService';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import PC from './component/PieChart'
import LC from './component/LineChart'
import SocketHelper from '../../helpers/socket';
import { HMPallete } from '../../helpers/pallete';

interface AlarmInterface {
  id: number | string;
  fullname: string;
  nama_kegiatan: string;
  detail: string;
  datenow: string;
  isRead: number;
}
interface DataChart {
  name: string;
  value: number;
  label: string;
  color: string;
}

interface LineChartData {
  timestamp: string;
  bahaya: number;
  waspada: number;
  aman: number;
}

interface CardProps {
  alarm: AlarmInterface;
}

interface detailPenugasanInterface {
  jumlah_personel: number | string;
  nama_kegiatan: string;
  personel_offline: number | string;
  surat_tugas: string;
  waktu_kegiatan: {
    end_date: string;
    start_date: string;
  };
}
interface statisticPersonelInterface {
  jumlah_penugasan_berlangsung: number | string;
  jumlah_personel_dalam_penugasan: number | string;
  jumlah_personel_offline: number | string;
  jumlah_personel_online: number | string;
}

const Statistic = () => {
  const [detailPenugasan, setDetailPenugasan] = useState<detailPenugasanInterface[]>([])
  const [statisticPersonels, setStatisticPersonels] = useState<statisticPersonelInterface | null>(null)
  const [dataChartsp, setDataChartsp] = useState<DataChart[]>([]);
  const [dataChartHr, setDataChartHr] = useState<DataChart[]>([]);
  const [dataChartTemp, setDataChartTemp] = useState<DataChart[]>([]);
  const [alarms, setAlarms] = useState<AlarmInterface[]>([]);
  const [sensorDataHR, setSensorDataHR] = useState<LineChartData[]>([]);
  const [sensorDataSpo2, setSensorDataSpo2] = useState<LineChartData[]>([]);
  const [sensorDataTemp, setSensorDataTemp] = useState<LineChartData[]>([]);

  const getPenugasanOnGoing = async () => {
    try {
      const res = await MonitoringService.getPenugasanOnGoing();
      const data = res.data.data
      setDetailPenugasan(data);

    } catch (error) {
      console.error(error);

    }
  }
  const getAlarm = async () => {
    try {
      const res = await MonitoringService.getAlarm();
      const alarmData = res.data.data;
      setAlarms(alarmData);

    } catch (error) {
      console.error(error);

    }
  }
  const getStatisticPersonels = async () => {
    try {
      const res = await MonitoringService.getStatisticPersonels();
      const data = res.data.data as statisticPersonelInterface
      setStatisticPersonels(data)

    } catch (error) {
      console.error(error);

    }
  }
  const getLineChartData = async () => {
    try {
      const res = await MonitoringService.getStatisticHealthbyTime();
      const sortedData = res.data.data.slice(-5).reverse();
  
      const formattedData = sortedData.map((item: any) => ({
        timestamp: moment(item.date).format('HH:mm'),
        bahaya: item.heart_rate.bahaya,
        waspada: item.heart_rate.waspada,
        aman: item.heart_rate.aman,
      }));
      setSensorDataHR(formattedData);
  
      const formattedDataSpo2 = sortedData.map((item: any) => ({
        timestamp: moment(item.date).format('HH:mm'),
        bahaya: item.spo2.bahaya,
        waspada: item.spo2.waspada,
        aman: item.spo2.aman,
      }));
      setSensorDataSpo2(formattedDataSpo2);
  
      const formattedDataTemp = sortedData.map((item: any) => ({
        timestamp: moment(item.date).format('HH:mm'),
        bahaya: item.temperature.bahaya,
        waspada: item.temperature.waspada,
        aman: item.temperature.aman,
      }));
      setSensorDataTemp(formattedDataTemp);
    } catch (error) {
      console.error(error);
      // Handle the error accordingly
    }
  }
  const getPieChartData = async () => {
    interface AnomaliResponse {
      aman: number;
      waspada: number;
      bahaya: number;
    }
    try {
      const res = await MonitoringService.getStatisticHealth();
      const { heart_rate, spo2, temperature } = res.data.data;
      const FormattedHR: DataChart[] = Object.keys(heart_rate).map((key: string) => ({
        name: key,
        value: heart_rate[key],
        label: key,
        color: HMPallete[key as "aman" | "waspada" | "bahaya"]
      }))
      setDataChartHr(FormattedHR);
      const FormattedSPO2: DataChart[] = Object.keys(spo2).map((key: string) => ({
        name: key,
        value: spo2[key],
        label: key,
        color: HMPallete[key as "aman" | "waspada" | "bahaya"]
      }))
      setDataChartsp(FormattedSPO2);
      const FormattedTemp: DataChart[] = Object.keys(temperature).map((key: string) => ({
        name: key,
        value: temperature[key],
        label: key,
        color: HMPallete[key as "aman" | "waspada" | "bahaya"]
      }))
      setDataChartTemp(FormattedTemp);
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<detailPenugasanInterface> = [
    {
      title: 'Jumlah Personel',
      dataIndex: 'jumlah_personel',
      key: 'jumlah_personel',
      align: 'center'
    },
    {
      title: 'Nama Kegiatan',
      dataIndex: 'nama_kegiatan',
      key: 'nama_kegiatan'
    },
    {
      title: 'Surat Tugas',
      dataIndex: 'surat_tugas',
      key: 'surat_tugas'
    },
    {
      title: 'Waktu Kegiatan',
      dataIndex: ['waktu_kegiatan', 'start_date'], // update the dataIndex to access the nested start_date property
      key: 'start_date',
      render: (date: any) => moment(date).format('YYYY/MM/DD hh:mm'),
    },
    {
      title: 'Personel Offline',
      dataIndex: 'personel_offline',
      key: 'personel_offline',
      align: 'center'
    }
  ];

  const handleAlarm = (payload: any) => {
    try {
      const alarm = payload as AlarmInterface;
      setAlarms((prevAlarms) => [...prevAlarms, alarm]);
      notification.open({
        message: `New Alarm`,
        description: `${alarm.fullname} ${alarm.detail}`,
        placement: 'topLeft',
      });
    } catch (error) {
      console.error('Error parsing alarm payload:', error);
    }
  }
  useEffect(() => {
    getPenugasanOnGoing();
    getStatisticPersonels();
    getPieChartData();
    getAlarm();
    getLineChartData();
  }, [])

  useEffect(() => {
    const socket = SocketHelper.createConnection
    socket.on('alarm-channel', handleAlarm);
    return () => {
      socket.off('alarm-channel', handleAlarm);
    };
  }, [])
  return (
    <Row style={{ width: '100%' }} gutter={24}>
      <Col md={6}>
        <Card>
          <Space direction='vertical' style={{ width: '100%', textAlign: 'center', minHeight: '100vh' }}>
            <Typography.Title level={3}>
              Alarm
            </Typography.Title>
            {
              [...alarms].map((alarm) => (
                <Card style={{ width: '100%' }}>
                  <Space direction='horizontal' style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Text>{alarm.fullname}</Typography.Text>
                    <Typography.Text>{moment(alarm.datenow).format('HH:mm')}</Typography.Text>
                  </Space>
                  <Space direction='horizontal' style={{ justifyContent: 'space-between', width: '100%', textAlign: 'left' }}>
                    <Typography.Text>{alarm.detail}</Typography.Text>
                  </Space>
                </Card>
              ))
            }
            <Space direction='vertical'>

            </Space>
          </Space>
        </Card>
      </Col>
      <Col md={18}>
        <Card>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Row>
              <Col span={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Typography.Title level={1}>{statisticPersonels?.jumlah_personel_dalam_penugasan}</Typography.Title>
                  </Col>
                  <Col span={12}>
                    <Row><Typography.Text>Personel</Typography.Text></Row>
                    <Row><Typography.Text>Dalam Penugasan</Typography.Text></Row>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Typography.Title level={1}>{statisticPersonels?.jumlah_penugasan_berlangsung}</Typography.Title>
                  </Col>
                  <Col span={12}>
                    <Row><Typography.Text>Penugasan</Typography.Text></Row>
                    <Row><Typography.Text>Sedang Berlangsung</Typography.Text></Row>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row gutter={[16, 16]}>
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Typography.Title level={1}>{statisticPersonels?.jumlah_personel_online}</Typography.Title>
                  </Col>
                  <Col span={12}>
                    <Row><Typography.Text>Personel</Typography.Text></Row>
                    <Row><Typography.Text>Online</Typography.Text></Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Space>
        </Card>
        <Space style={{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: '18px 0' }}>
          <Table dataSource={detailPenugasan} columns={columns} style={{ textAlign: 'center', paddingTop: '20px' }} pagination={false} />
        </Space>
        <Row>
          <Col span={8}>
            <Space direction='vertical' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

              <Typography.Title level={4}>Heart Rate</Typography.Title>
              <PC data={dataChartHr} size={320} />
              <LC data={sensorDataHR} size={400}/>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction='vertical' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Typography.Title level={4}>SpO2</Typography.Title>
              <PC data={dataChartsp} size={320} />
              <LC data={sensorDataSpo2} size={400}/>
              
            </Space>
          </Col>
          <Col span={8}>
            <Space direction='vertical' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Typography.Title level={4}>Temperature</Typography.Title>
              <PC data={dataChartTemp} size={320} />
              <LC data={sensorDataTemp} size={400}/>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Statistic