import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Image, Input, Row, Space } from 'antd';
import style from './style';
import { useFormik } from 'formik';
import assets from '../../../assets/assets';
import LoginSchema from '../../../res/schema/Auth/Login/Login.schema';
import Login from '../../../res/type/Login.type';
import AuthService from '../../../services/AuthServices';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../../../redux/Hook';
import authSlice from '../../../redux/Slice/AuthSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  const {setAuth} = authSlice.actions
  const dispatch = useAppDispatch()
  const [httpError, setHttpError] = useState({
    hasError: false,
    error: ''
  })

  const onSubmit = async (values: Login) => {
    try {
      const res = await AuthService.Login(values)
      setHttpError({hasError:false,error:''})
      const resData = res.data.data
      const authState = {
        accessToken: resData.accessToken,
        user: resData.userInfo,
        isLoggedIn: true
      }
      dispatch(setAuth(authState))
      navigate('/home')

    } catch (error: AxiosError | any) {
      console.error(error);
      setHttpError({ hasError: true, error: error.response?.data?.error || ''})
    }
  }

  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit
  })

  return (
    <Space className={style.centeredSpace}>
      <Space direction="vertical" size="middle">
        {httpError.hasError && <Alert type='error' message={httpError.error} showIcon/>}
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