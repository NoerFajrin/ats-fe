import { Input, Typography } from "antd";
import React, { ChangeEventHandler, FC } from "react";
import style from './style'

const { TextArea } = Input;

type BasicProps = {
  value: string;
  label: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  errorText?: string;
};

function TextAreaHere({
  value,
  label,
  placeholder = label,
  onChange,
  errorText = '',
}: BasicProps) {
  return (
    <div className={style.container}>
      <Typography.Text strong>{label}</Typography.Text>
      <TextArea rows={4} value={value} placeholder={placeholder} onChange={onChange} />
      {errorText && errorText !== '' && <Typography.Text type={'danger'} style={{ fontSize: 12, padding: 0 }}>{errorText}</Typography.Text>}
    </div>
  );
}

export default TextAreaHere;