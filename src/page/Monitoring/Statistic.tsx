import { Card, Col, Row, Space, Typography, Statistic as Stat, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MonitoringService from '../../services/MonitoringService';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';


interface AlarmInterface {
  id: number | string,
  fullname: string,
  message: string,
  timestamp: string
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

  const getPenugasanOnGoing = async () => {
    try {
      const res = await MonitoringService.getPenugasanOnGoing();
      const data = res.data.data
      console.log(data)
      setDetailPenugasan(data)

    } catch (error) {
      console.error(error);

    }
  }
  const getStatisticPersonels = async () => {
    try {
      const res = await MonitoringService.getStatisticPersonels();
      const data = res.data.data as statisticPersonelInterface
      console.log(data)
      setStatisticPersonels(data)

    } catch (error) {
      console.error(error);

    }
  }
  const alarms: AlarmInterface[] = [
    { id: 1, fullname: "Padlan Alqinsi", message: "HR diatas rata-rata", timestamp: "19:30" },
    { id: 2, fullname: "Alvin Mustafa", message: "HR diatas rata-rata", timestamp: "19:30" },
    { id: 3, fullname: "Eric Ten Hag", message: "HR diatas rata-rata", timestamp: "19:30" },
    // Add more alarms here...
  ];

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


  interface DataChartHR {
    name: string;
    value: number;
    label: string;
  }
  interface DataChartSP {
    name: string;
    value: number;
    label: string;
  }
  interface DataChartT {
    name: string;
    value: number;
    label: string;
  }

  const dataCharthr: DataChartHR[] = [
    { name: 'Warning', value: 1, label: '' },
    { name: 'Safe', value: 8, label: '' },
    { name: 'Danger', value: 1, label: '' },
  ];
  const dataChartsp: DataChartSP[] = [
    { name: 'Warning', value: 1, label: '' },
    { name: 'Safe', value: 5, label: '' },
    { name: 'Danger', value: 2, label: '' },
  ];
  const dataChartt: DataChartT[] = [
    { name: 'Warning', value: 1, label: '' },
    { name: 'Safe', value: 12, label: '' },
    { name: 'Danger', value: 1, label: '' },
  ];

  const chartSize = 230
  const colors = ['#FFCC66', '#66CCCC', '#FF6666'];
  const sensorDataHR = [
    { timestamp: '00:00', danger: 3, warning: 2, safe: 18 },
    { timestamp: '01:00', danger: 4, warning: 1, safe: 18 },
    { timestamp: '02:00', danger: 2, warning: 2, safe: 19 },
    { timestamp: '03:00', danger: 1, warning: 3, safe: 19 },
    { timestamp: '04:00', danger: 3, warning: 1, safe: 19 },
    { timestamp: '05:00', danger: 2, warning: 2, safe: 18 },
    { timestamp: '06:00', danger: 4, warning: 1, safe: 17 },
    { timestamp: '07:00', danger: 2, warning: 3, safe: 17 },
    { timestamp: '08:00', danger: 3, warning: 1, safe: 18 },
    { timestamp: '09:00', danger: 1, warning: 2, safe: 19 },
    { timestamp: '10:00', danger: 2, warning: 3, safe: 17 },
    { timestamp: '11:00', danger: 4, warning: 1, safe: 18 },
  ];
  const sensorDataSP = [
    { timestamp: '00:00', danger: 3, warning: 2, safe: 18 },
    { timestamp: '01:00', danger: 4, warning: 1, safe: 18 },
    { timestamp: '02:00', danger: 2, warning: 2, safe: 19 },
    { timestamp: '03:00', danger: 1, warning: 3, safe: 19 },
    { timestamp: '04:00', danger: 3, warning: 1, safe: 19 },
    { timestamp: '05:00', danger: 2, warning: 2, safe: 18 },
    { timestamp: '06:00', danger: 4, warning: 1, safe: 17 },
    { timestamp: '07:00', danger: 2, warning: 3, safe: 17 },
    { timestamp: '08:00', danger: 3, warning: 1, safe: 18 },
    { timestamp: '09:00', danger: 1, warning: 2, safe: 19 },
    { timestamp: '10:00', danger: 2, warning: 3, safe: 17 },
    { timestamp: '11:00', danger: 4, warning: 1, safe: 18 },
  ];
  const sensorDataT = [
    { timestamp: '00:00', danger: 3, warning: 2, safe: 18 },
    { timestamp: '01:00', danger: 4, warning: 1, safe: 18 },
    { timestamp: '02:00', danger: 2, warning: 2, safe: 19 },
    { timestamp: '03:00', danger: 1, warning: 3, safe: 19 },
    { timestamp: '04:00', danger: 3, warning: 1, safe: 19 },
    { timestamp: '05:00', danger: 2, warning: 2, safe: 18 },
    { timestamp: '06:00', danger: 4, warning: 1, safe: 17 },
    { timestamp: '07:00', danger: 2, warning: 3, safe: 17 },
    { timestamp: '08:00', danger: 3, warning: 1, safe: 18 },
    { timestamp: '09:00', danger: 1, warning: 2, safe: 19 },
    { timestamp: '10:00', danger: 2, warning: 3, safe: 17 },
    { timestamp: '11:00', danger: 4, warning: 1, safe: 18 },
  ];
  useEffect(() => {
    getPenugasanOnGoing();
    getStatisticPersonels();
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
              alarms.map((alarm) => (
                <Card style={{ width: '100%' }}>
                  <Space direction='horizontal' style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Text>{alarm.fullname}</Typography.Text>
                    <Typography.Text>{alarm.timestamp}</Typography.Text>
                  </Space>
                  <Space direction='horizontal' style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Text>{alarm.message}</Typography.Text>
                  </Space>
                </Card>
              ))
            }
            {/* <div style={{ display: "flex", flexDirection: "column", }}>
              {alarms.map((alarm) => (
                <div key={alarm.id} style={{ border: "1px solid black", padding: "0px", margin: "0px", width: "100%" }}>
                  <Row>
                    <Typography.Text style={{ textAlign: "left" }}>{alarm.fullname}</Typography.Text>
                    <h2 ></h2>
                    <p style={{ textAlign: "right" }}>{alarm.timestamp}</p>
                  </Row>
                  <Row>
                    <p style={{ textAlign: "left" }}>{alarm.message}</p>
                  </Row>
                </div>
              ))}
            </div> */}

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
        <Space style={{width:'100%', justifyContent:'center', alignItems:'center', margin:'18px 0'}}>
          <Table dataSource={detailPenugasan} columns={columns} style={{ textAlign: 'center', paddingTop: '20px' }} pagination={false}/>
        </Space>
        <Row>
          <Col span={8}>
            <Space direction='vertical' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

              <Typography.Title level={4}>Heart Rate</Typography.Title>
              <PieChart width={chartSize} height={chartSize}>
                <Pie
                  data={dataCharthr}
                  dataKey="value"
                  cx={chartSize / 2}
                  cy={chartSize / 2}
                  outerRadius={chartSize / 5}
                  fill="#8884d8"
                  label={({ name, value, label }) => `${value}`}
                >
                  {dataCharthr.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              <LineChart width={400} height={400} data={sensorDataHR}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="danger" stroke="#FF4136" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="warning" stroke="#FF851B" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="safe" stroke="#2ECC40" activeDot={{ r: 8 }} />
              </LineChart>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction='vertical' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Typography.Title level={4}>SpO2</Typography.Title>
              <PieChart width={chartSize} height={chartSize}>
                <Pie
                  data={dataChartsp}
                  dataKey="value"
                  cx={chartSize / 2}
                  cy={chartSize / 2}
                  outerRadius={chartSize / 5}
                  fill="#8884d8"
                  label={({ name, value, label }) => ` ${value}`}
                >
                  {dataChartsp.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              <LineChart width={400} height={400} data={sensorDataSP}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="danger" stroke="#FF4136" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="warning" stroke="#FF851B" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="safe" stroke="#2ECC40" activeDot={{ r: 8 }} />
              </LineChart>
            </Space>
          </Col>
          <Col span={8}>
            <Space direction='vertical' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <Typography.Title level={4}>Temperature</Typography.Title>
              <PieChart width={chartSize} height={chartSize}>
                <Pie
                  data={dataChartt}
                  dataKey="value"
                  cx={chartSize / 2}
                  cy={chartSize / 2}
                  outerRadius={chartSize / 5}
                  fill="#8884d8"
                  label={({ name, value, label }) => `${value}`}
                >
                  {dataChartt.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              <LineChart width={400} height={400} data={sensorDataT}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="danger" stroke="#FF4136" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="warning" stroke="#FF851B" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="safe" stroke="#2ECC40" activeDot={{ r: 8 }} />
              </LineChart>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Statistic