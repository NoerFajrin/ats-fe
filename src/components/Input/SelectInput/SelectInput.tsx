import { Select, Space, Typography } from 'antd'
import React from 'react'
import styles from './style'

type Option = {
  label: string;
  value: any;
}
type SingleSelectProps = {
  label: string;
  options: Option[];
  onChange: (value: string) => void
  loading?: boolean;
  disabled?: boolean
  errorText?: string;
}
const SingleSelect = ({ label, options, onChange, loading = false, disabled = false, errorText = '' }: SingleSelectProps) => {
  return (
    <div className={styles.container}>
      <Typography.Text strong>{label}</Typography.Text>
      <Select options={options} placeholder={label} loading={loading} onChange={onChange} disabled={disabled} defaultActiveFirstOption/>
      {errorText && errorText !== '' && <Typography.Text type={'danger'} style={{ fontSize: 12, padding: 0 }}>{errorText}</Typography.Text>}
    </div>
  )
}

export default SingleSelect