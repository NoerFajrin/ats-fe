import { Select, Typography } from 'antd'
import React from 'react'
import style from './style'

interface SelectSearchProps {
    options: { value: string, label: string }[];
    onSearch: (query: string) => void;
    label: string;
    onChange: (value: any) => void;
    placeholder?: string
}

function SelectSearch({ options = [], onSearch, label, onChange, placeholder="Tulis untuk mencari" }: SelectSearchProps) {
    return (
        <div className={style.container}>
            <Typography.Text strong>{label}</Typography.Text>
            <Select
                placeholder={placeholder}
                options={options}
                showSearch
                onSearch={onSearch}
                onChange={onChange}
                filterOption={() => true}
            />
        </div>
    )
}

export default SelectSearch