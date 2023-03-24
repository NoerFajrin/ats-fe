import { Input, Typography } from "antd";
import React, { ChangeEventHandler, FC } from "react";
import style from './style'

type BasicProps = {
  value: string;
  label: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorText?: string;
};

function TextInput({
  value,
  label,
  placeholder = label,
  onChange,
  errorText = '',
}: BasicProps) {
  return (
    <div className={style.container}>
      <Typography.Text strong>{label}</Typography.Text>
      <Input value={value} placeholder={placeholder} onChange={onChange} />
      {errorText && errorText !== '' && <Typography.Text type={'danger'} style={{ fontSize: 12, padding: 0 }}>{errorText}</Typography.Text>}
    </div>
  );
}

export default TextInput;