import { Button, Cascader, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Space, Switch, Tabs, TabsProps, TreeSelect, Typography, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { Option } from 'antd/es/mentions';

const onChange = (key: string) => {
  console.log(key);
};
const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Rute Perjalanan`,
    children: "Journey Plan",
  },
  {
    key: '2',
    label: `Detail Surat`,
    children: "Detail",
  }
];

const props: UploadProps = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
        method: 'POST',
        body: file,
      })
        .then((res) => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  };
 
  type SizeType = Parameters<typeof Form>[0]['size'];
  const { RangePicker } = DatePicker;

function BuatSurat() {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  return (
    <Space direction="vertical" style={{width:"100%"}}>
       <Space style={{width:"100%"}}> 
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 600 }}
          >
           <Form.Item label="Upload Surat Fisik">
           <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
            </Form.Item> 
          <Form.Item label="Jenis Surat">
            <Select>
              <Select.Option value="d">Surat Tugas</Select.Option>
              <Select.Option value="demo">Surat Perintah</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Nomor Surat">
            <Input />
          </Form.Item>
          <Form.Item label="Tanggal Surat">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Sumber Surat">
            <Select>
              <Select.Option value="dq">Ka. Korlantas</Select.Option>
              <Select.Option value="dw">Ka. POLRI</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Nama Kegiatan">
            <Input />
          </Form.Item>
          <Form.Item label="Waktu Pelaksanaan">
            <RangePicker showTime />
          </Form.Item>         
        </Form>
    </Space> 
    <Space>
      <Tabs defaultActiveKey="1" style={{paddingLeft:15}} items={items} onChange={onChange} />
    </Space>
    <Button style={{backgroundColor:`#000000`, color:'#fff'}} >Simpan Surat</Button>
    </Space>    
  )
}

export default BuatSurat