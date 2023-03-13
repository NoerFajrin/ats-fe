import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, Input, Row, Space } from 'antd';
import style from './style';
import { useFormik } from 'formik';
import assets from '../../../assets/assets';

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values => console.log(values))
  })

  return (
    <Space className={style.centeredSpace}>
      
      
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Space direction="horizontal" size="middle" style={{ display: 'flex' }}>
      <Image
        height={200} src={assets.images.lambang_polri}
       />
       <Image
         height={200} src={assets.images.lambang_korlantas}
       />
      </Space>
      
       <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        // onFieldsChange={(val) => {
        //   const formattedVal = val.map(item => ({ [item.name[0]]: item.value }))
        //   console.log(formattedVal)

        // }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </Space> 
    </Space>
  );
};

export default LoginPage;