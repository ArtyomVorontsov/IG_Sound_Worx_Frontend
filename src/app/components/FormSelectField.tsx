import React, { ChangeEvent } from 'react';
import { Select, Form } from 'antd';
import { PriceItemType, FieldType } from '../types/interfaces';
const { Option } = Select;


type FormSelectFieldProps = {
    setFormValues: (e: any) => void
    name: string
    label: string
    children: Array<React.ReactNode>
}

export const FormSelectField = ({ setFormValues , name, label, children }: FormSelectFieldProps) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[{ required: true, message: "Field is required" }]}>

            <Select onChange={setFormValues}>
                {children}
            </Select>
        </Form.Item>
    )
}
