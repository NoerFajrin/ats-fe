import { useState } from 'react'
import { Card, Col, Row, Space, Statistic } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Space direction="vertical" style={{ width:"70vw" }}>
    <Row gutter={30}>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Above Average Heart Rate"
            value={11}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="Person"
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Normal Heart Rate"
            value={56}
            precision={0}
            valueStyle={{ color: 'Blue' }}
            suffix="Person"
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Under Average Heart Rate"
            value={12}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
          // prefix={<ArrowDownOutlined />}
            suffix="Person"
          />
        </Card>
      </Col>    
  </Row>
  <Row gutter={30}>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Above Average SPO2"
            value={11}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="Person"
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Normal SPO2"
            value={56}
            precision={0}
            valueStyle={{ color: 'Blue' }}
            suffix="Person"
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Under Average SPO2"
            value={12}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
          // prefix={<ArrowDownOutlined />}
            suffix="Person"
          />
        </Card>
      </Col>    
  </Row>
  <Row gutter={30}>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Above Average Temperature"
            value={11}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            suffix="Person"
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Normal Temperature"
            value={56}
            precision={0}
            valueStyle={{ color: 'Blue' }}
            suffix="Person"
          />
        </Card>
      </Col>
      <Col md={8}>
        <Card bordered={false}>
          <Statistic
            title="Under Average Temperature"
            value={12}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
          // prefix={<ArrowDownOutlined />}
            suffix="Person"
          />
        </Card>
      </Col>    
  </Row>
  </Space>
  )
}

export default App
