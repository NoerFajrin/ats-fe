import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, Input, Row, Space } from 'antd';
import style from './style';
import { useFormik } from 'formik';
import assets from '../../../assets/assets';
import LoginSchema from '../../../res/schema/Auth/Login/Login.schema';

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const formik = useFormik({
    validationSchema: LoginSchema,
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
          <img
            height={200} src={assets.images.lambang_polri}
          />
          <img
            height={200} src={assets.images.lambang_korlantas}
          />
        </Space>

        <form onSubmit={formik.handleSubmit}>
          <Space style={{ width: '100%' }} size={'middle'} direction={'vertical'}>
            <Input prefix={<UserOutlined />} value={formik.values.username} onChange={formik.handleChange('username')} placeholder={'username'} status={formik.errors.username && formik.errors.username !== '' ? 'error' : ''} />
            <Input.Password prefix={<LockOutlined />} value={formik.values.password} onChange={formik.handleChange('password')} placeholder={'password'} status={formik.errors.password && formik.errors.password !== '' ? 'error' : ''} />
            <Button type='primary' block htmlType='submit'>SIGN IN</Button>
          </Space>
        </form>

      </Space>
    </Space>
  );
};

export default LoginPage;