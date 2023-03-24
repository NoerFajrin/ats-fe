import { DatePicker, Space, Typography } from 'antd'
import React from 'react'
import styles from './style'

type BasicDatePickerProps ={
    onChange: (value:any, valueString:string) => void;
    label: string;
    errorText?: string;
}
const BasicDatePicker = ({label, onChange, errorText=''}:BasicDatePickerProps) => {
  return (
    <div className={styles.container}>
        <Typography.Text strong>{label}</Typography.Text>
        <DatePicker onChange={onChange} placeholder={label}/>
        {errorText && errorText !== '' && <Typography.Text type={'danger'} style={{ fontSize: 12, padding: 0 }}>{errorText}</Typography.Text>}
    </div>
  )
}

export default BasicDatePicker