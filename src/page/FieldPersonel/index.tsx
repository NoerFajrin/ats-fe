import { Button, Card, Checkbox, Col, Form, Input, Select, Space, Table, Typography, Upload } from 'antd'
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useEffect, useState } from 'react'
import PersonelServices from '../../services/PersonelServices';

interface ListPersonelInterface {
  id: number | string,
  fullname: string, 
  role: number | string,
}

function FieldPersonel() {
const [personelList, setPersonelist] = useState<ListPersonelInterface[]>([])


  const getPersonel = async () => {
    try {
      const res = await PersonelServices.ListPersonel();
      console.log(res.data.data.data);
      setPersonelist(res.data.data.data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPersonel();
  }, [])

  const columns = [
   
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_, data: ListPersonelInterface) => {
        let role="";
        if (_=== 4){
          role = " Field Personel"
        }
        else {
          role = "admin"
        }
        //console.log(_);

        return (
          <Space direction='vertical'>
            <p>{role}</p>
          </Space>
        );
      }
    },
    {
      title: 'Aksi',
      dataIndex: 'id',
      key: 'action',
      render: (_, data: ListPersonelInterface) => {
        //console.log(_);

        return (
          <Space direction='vertical'>
            <Button type="primary">Detail</Button>
          </Space>
        );
      }
    },
    
  ]

  return (
    <Space direction="vertical" style={{width:"100%"}}>
       <Typography.Title level={3} style={{paddingLeft:15}}>Field Personel</Typography.Title>
        <Table dataSource={personelList} columns={columns} />
    </Space> 
  )
}

export default FieldPersonel