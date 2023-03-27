import { Button, Card, Checkbox, Col, Form, Input, Select, Space, Upload } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React from 'react'
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };

  const options = [
    { label: 'Ahmad', value: '1' },
    { label: 'Sobri', value: '2' },
    { label: 'Joko', value: '3' },
    { label: 'Joki', value: '4' },
    { label: 'Zaki', value: '5' },
    { label: 'Yuli', value: '6' },
  ];

function FieldPersonel() {
    
  return (
    <Space direction="vertical" style={{width:"100%"}}>
       <Space style={{width:"100%"}}> 
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
          <Form.Item label="Jenis Personel">
            <Select>
              <Select.Option value="d">Dalam Tugas</Select.Option>
              <Select.Option value="demo">Tidak Dalam Tugas</Select.Option>
            </Select>
          </Form.Item> 
          <Form.Item label="Pilih Personel">
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: "100%" }} />
          </Form.Item> 
          <Form.Item>
                    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
          </Form.Item> 
        </Form>
    </Space> 
    <Card title="Pengawalan G20" bordered={false} style={{ width: "100%" }}>
        <Space direction="horizontal" size={'large'}>
        <Col>
        <p>dari</p>
        <p>Jakarta</p>
        </Col>
        <Col>
        <p>Ke</p>
        <p>Bali</p>
        </Col>
        <Col>
        <p>Mulai</p>
        <p>21/03/2023</p>
        </Col>
        <Col>
        <p>Selsai</p>
        <p>22/03/2023</p>
        </Col>
        </Space>
        
    
  </Card>

    </Space> 
  )
}

export default FieldPersonel