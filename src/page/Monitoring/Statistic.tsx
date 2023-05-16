import { Card, Col, Row, Space, Typography, Statistic as Stat, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MonitoringService from '../../services/MonitoringService';
import moment from 'moment';


interface AlarmInterface {
  id: number | string,
  fullname: string,
  message: string,
  timestamp: string
}
interface DataChart {
  name: string;
  value: number;
  label: string;
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
  surat_tujumlah_personel_onlinegas: number | string;
}

const Statistic = () => {
  const [detailPenugasan, setDetailPenugasan] = useState <detailPenugasanInterface| null>(null)
  const [statisticPersonels, setStatisticPersonels] = useState<statisticPersonelInterface | null> (null)
  const [dataChartsp, setDataChartsp] = useState<DataChart[]>([]);
  const [dataChartHr, setDataChartHr] = useState<DataChart[]>([]);
  const [dataChartTemp, setDataChartTemp] = useState<DataChart[]>([]);

  const getPenugasanOnGoing = async () => {
    try {
        const res = await MonitoringService.getPenugasanOnGoing();
        const data = res.data.data as detailPenugasanInterface
        console.log(data)
        setDetailPenugasan(data)

    } catch (error) {
      console.error(error);

    }
  }
  const getStatisticPersonels =  async () => {
    try {
        const res = await MonitoringService.getStatisticPersonels();
        const data = res.data.data as statisticPersonelInterface
        console.log(data)
        setStatisticPersonels(data)

    } catch (error) {
      console.error(error);

    }
  }
  const getStatisticTemperature = async () => {
    try {
      const res = await MonitoringService.getStatisticHealth();
      const temp = res.data.data.temperature;
      console.log(temp);
      const formattedData = Object.keys(temp).map((key) => ({
        name: key,
        value: temp[key],
        label: key,
      }));
      setDataChartTemp(formattedData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getStatisticHeartRate = async () => {
    try {
      const res = await MonitoringService.getStatisticHealth();
      const heart_rate = res.data.data.heart_rate;
      console.log(heart_rate);
      const formattedData = Object.keys(heart_rate).map((key) => ({
        name: key,
        value: heart_rate[key],
        label: key,
      }));
      setDataChartHr(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatisticSpo2 = async () => {
    try {
      const res = await MonitoringService.getStatisticHealth();
      const spo2 = res.data.data.spo2;
      console.log(spo2);
      const formattedData = Object.keys(spo2).map((key) => ({
        name: key,
        value: spo2[key],
        label: key,
      }));
      setDataChartsp(formattedData);
    } catch (error) {
      console.error(error);
    }
  };
  const alarms: AlarmInterface[] = [
    { id: 1, fullname: "Padlan Alqinsi", message: "HR diatas rata-rata", timestamp: "19:30" },
    { id: 2, fullname: "Alvin Mustafa", message: "HR diatas rata-rata", timestamp: "19:30" },
    { id: 3, fullname: "Eric Ten Hag", message: "HR diatas rata-rata", timestamp: "19:30" },
    // Add more alarms here...
  ];

  const columns = [
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
      render: (date) => moment(date).format('YYYY/MM/DD hh:mm'),
    },
    {
      title: 'Personel Offline',
      dataIndex: 'personel_offline',
      key: 'personel_offline',
      align: 'center'
    }
  ];
  const colors = [ '#66CCCC','#FFCC66', '#FF6666', ]; //Aman, Waspada, Bahaya 
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
    getStatisticTemperature();
    getStatisticHeartRate();
    getStatisticSpo2();
  }, [])
  return (
    <Row style={{ width: '100%' }} gutter={24}>
      <Col md={6}>
        <Card>
          <Space direction='vertical' style={{ width: '100%', textAlign: 'center' }}>
            <Typography.Title level={3}>
              Alarm
            </Typography.Title>
            <div style={{ display: "flex", flexDirection: "column", }}>
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
                    {/* Add more content here... */}
                  </div>
                ))}
              </div>

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
                    <Typography.Title level={1}>{statisticPersonels?.surat_tujumlah_personel_onlinegas}</Typography.Title>
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
          <Table dataSource={detailPenugasan} columns={columns} style={{ textAlign: 'center', paddingTop: '20px' }} />
        </Row>
        <Row>
        <Col span={8}>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          Heart Rate
        </Typography.Title>
        <PieChart width={400} height={400}>
          <Pie
            data={dataChartHr}
            dataKey="value"
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label={({ value }) => ` ${value}`}
          >
            {dataChartHr.map((entry, index) => (
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
                data={dataChartTemp}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label={({ name, value, label }) => ` ${value}`}
              >
                {dataChartTemp.map((entry, index) => (
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