import { Card, Col, Row, Space, Typography, Statistic as Stat, Table } from 'antd'
import React from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


interface AlarmInterface {
  id: number | string,
  fullname: string,
  message: string,
  timestamp: string
}

interface CardProps {
  alarm: AlarmInterface;
}

const data = [
  {
    key: '1',
    jumlahPersonel: 5,
    namaKegiatan: 'Pembangunan Jembatan',
    suratTugas: 'ST-001',
    waktuPelaksanaan: '2023-09-01 - 2023-09-01',
    personelOffline: 1
  },
  {
    key: '2',
    jumlahPersonel: 8,
    namaKegiatan: 'Peningkatan Jalan',
    suratTugas: 'ST-002',
    waktuPelaksanaan: '2023-09-01 - 2023-09-01',
    personelOffline: 1
  },
  {
    key: '3',
    jumlahPersonel: 3,
    namaKegiatan: 'Rehabilitasi Sungai',
    suratTugas: 'ST-003',
    waktuPelaksanaan: '2023-09-01 - 2023-09-01',
    personelOffline: 0
  },
  {
    key: '4',
    jumlahPersonel: 6,
    namaKegiatan: 'Perbaikan Jembatan',
    suratTugas: 'ST-004',
    waktuPelaksanaan: '2023-09-01 - 2023-09-01',
    personelOffline: 3
  },
  {
    key: '5',
    jumlahPersonel: 4,
    namaKegiatan: 'Pembangunan Gedung',
    suratTugas: 'ST-005',
    waktuPelaksanaan: '2023-09-01 - 2023-09-01',
    personelOffline: 0
  }
];


const Statistic = () => {
  const alarms: AlarmInterface[] = [
    { id: 1, fullname: "Padlan Alqinsi", message: "HR diatas rata-rata", timestamp: "19:30" },
    { id: 2, fullname: "Alvin Mustafa", message: "HR diatas rata-rata", timestamp: "19:30" },
    { id: 3, fullname: "Eric Ten Hag", message: "HR diatas rata-rata", timestamp: "19:30" },
    // Add more alarms here...
  ];

  const columns = [
    {
      title: 'Jumlah Personel',
      dataIndex: 'jumlahPersonel',
      key: 'jumlahPersonel',
      align: 'center'
    },
    {
      title: 'Nama Kegiatan',
      dataIndex: 'namaKegiatan',
      key: 'namaKegiatan'
    },
    {
      title: 'Surat Tugas',
      dataIndex: 'suratTugas',
      key: 'suratTugas'
    },
    {
      title: 'Waktu Pelaksanaan',
      dataIndex: 'waktuPelaksanaan',
      key: 'waktuPelaksanaan'
    },
    {
      title: 'Personel Offline',
      dataIndex: 'personelOffline',
      key: 'personelOffline',
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
  return (
    <Row style={{ width: '100%' }} gutter={24}>
      <Col md={6}>
        <Card>
          <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
            <Typography.Title level={3}>
              Alarm
            </Typography.Title>

            <Space direction='vertical'>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {alarms.map((alarm) => (
                  <div key={alarm.id} style={{ border: "1px solid black", padding: "16px", margin: "16px", width: "100%" }}>
                    <Row>
                      <Typography.Text style={{ textAlign: "left" }}>{alarm.fullname}</Typography.Text>
                      <h2 ></h2>
                      <p style={{ textAlign: "right" }}>{alarm.timestamp}</p>
                    </Row>
                    <Row>
                      <p style={{ textAlign: "left" }}>{alarm.message}</p>
                    </Row>
                    {/* Add more content here... */}
                  </div>
                ))}
              </div>
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
                    <Typography.Title level={1}>27</Typography.Title>
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
                    <Typography.Title level={1}>5</Typography.Title>
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
                    <Typography.Title level={1}>26</Typography.Title>
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
        <Row justify="center" align="middle">
          <Table dataSource={data} columns={columns} style={{ textAlign: 'center', paddingTop: '20px' }} />
        </Row>
        <Row>
          <Col span={8}>
          <Typography.Title level={4} style={{ textAlign: 'center' }}>Heart Rate</Typography.Title>
            <PieChart width={400} height={400}>
              <Pie
                data={dataCharthr}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label={({ name, value, label }) => `${value}`}
              >
                {dataCharthr.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </Col>
          <Col span={8}>
          <Typography.Title level={4} style={{ textAlign: 'center' }}>SpO2</Typography.Title>
            <PieChart width={400} height={400}>
              <Pie
                data={dataChartsp}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label={({ name, value, label }) => ` ${value}`}
              >
                {dataChartsp.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>

          </Col>
          <Col span={8}>
          <Typography.Title level={4} style={{ textAlign: 'center' }}>Temperature</Typography.Title>
            <PieChart width={400} height={400}>
              <Pie
                data={dataChartt}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label={({ name, value, label }) => `${value}`}
              >
                {dataChartt.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={8} >
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
          </Col>
          <Col span={8} >
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
          </Col>
          <Col span={8}>
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
          </Col>

        </Row>
      </Col>
    </Row>
  )
}

export default Statistic