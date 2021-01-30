import React from 'react'
import { FieldGroup } from './FormComponents'
import FormItem from 'antd/lib/form/FormItem'
import { Input, Form } from 'antd'
import { FieldType } from '../types/interfaces'


type NameEmailFieldsProps = {
    setFormValues: (field: FieldType) => void
}

export const NameEmailFields = ({setFormValues}: NameEmailFieldsProps) => {

    const contactFields = [
        { name: "full_name", label: "Full name" },
        { name: "email", label: "Email" },
    ]

    return (
        <FieldGroup>
        {
            contactFields.map((field) => {
                return <Form.Item
                    key={field.name}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    name={field.name}
                    label={field.label}
                    rules={[{ required: true, message: "Field is required" }]}>
                    <Input onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} type="text" />
                </Form.Item>
            })
        }
    </FieldGroup>
    )
}
