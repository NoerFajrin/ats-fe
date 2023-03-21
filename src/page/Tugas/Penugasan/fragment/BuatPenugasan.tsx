import { Button, Checkbox, Form, Input, Select, Space, Table } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useState } from 'react'
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
type SizeType = Parameters<typeof Form>[0]['size'];

const dataSource = [
    {
        key: '3',
        jenis_surat: 'John',
        nomor_surat: 42,
        tanggal_surat: '10 Downing Street',
        sumber_surat:'Ka. Korlantas',
        nama_kegiatan:'Pengawalan G20',
        waktu_pelaksanaan:'23:20 9/3/2023 - 22:20 9/3/2023'
      },

  ];

  const columns = [
    {
      title: 'Jenis Surat',
      dataIndex: 'jenis_surat',
      key: 'jenis_surat',
    },
    {
      title: 'Nomor Surat',
      dataIndex: 'nomor_surat',
      key: 'nomor_surat',
    },
    {
      title: 'Tanggal Surat',
      dataIndex: 'tanggal_surat',
      key: 'tanggal_surat',
    },
    {
        title: 'Sumber Surat',
        dataIndex: 'sumber_surat',
        key: 'sumber_surat',
      },
      {
        title: 'Nama Kegiatan',
        dataIndex: 'nama_kegiatan',
        key: 'nama_kegiatan',
      },
      {
        title: 'Waktu Pelaksanaan',
        dataIndex: 'waktu_pelaksanaan',
        key: 'waktu_pelaksanaan',
      },
  ];
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
 
function BuatPenugasan() {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
      setComponentSize(size);
    };
  return (
    
    <Space direction="vertical" style={{width: '100%'}}>
        <Space> 
            <Form labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize as SizeType}
                style={{ maxWidth: 600 }}>
                <Form.Item label="Pilih Surat">
                    <Search placeholder="input search text" onSearch={onSearch} style={{ width: "100%" }} />
                </Form.Item>
                <Table dataSource={dataSource} columns={columns} /> 
                <Form.Item style={{width: 600}} label="Penanggung Jawab">
                    <Select>
                        <Select.Option value="ka.DivA">Ka. Div A</Select.Option>
                        <Select.Option value="ka.DivB">Ka. Div B</Select.Option>
                 </Select>
                </Form.Item > 
                <Form.Item label="Jumlah Personel">
                    <Input defaultValue="" />
                </Form.Item>
                <Form.Item>
                    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
                </Form.Item>
                <Button style={{backgroundColor:"dark"}}>Kirim Penugasan</Button>       
            </Form>       
        </Space>
        <Space>
            
        </Space>
        
    </Space>
       
    
  
    
       
  )
}

export default BuatPenugasan