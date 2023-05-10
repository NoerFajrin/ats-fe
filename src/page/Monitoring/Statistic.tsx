import { Card, Col, Row, Space, Typography, Statistic as Stat } from 'antd'
import React from 'react'

const Statistic = () => {
  return (
    <Row style={{ width: '100%' }} gutter={24}>
      <Col md={6}>
        <Card>
          <Space direction='vertical' style={{width:'100%', textAlign:'center'}}>
            <Typography.Title level={5}>
              JUMLAH ANGGOTA
            </Typography.Title>
            <Space direction='horizontal'>
            <Stat title={'JUMLAH PERSONIL'} value={1024}/>
            <Stat title={'JUMLAH KELOMPOK'} value={256}/>
            </Space>
          </Space>  
        </Card>
      </Col>
      <Col md={12}>
        <Card>
          <Space direction='vertical' style={{width:'100%', textAlign:'center'}}>
            <Typography.Title level={5}>
              RATA - RATA HRM
            </Typography.Title>
          </Space>
        </Card>
      </Col>
      <Col md={6}>
        <Card>

        </Card>
      </Col>
    </Row>
  )
}

export default Statistic