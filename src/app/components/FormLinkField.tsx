import React from 'react'
import { Form, Input } from "antd"
import { FieldType } from '../types/interfaces'

export const FormLinkField = ({ setFormValues}: {setFormValues: (field: FieldType) => void}) => {
    return (
        <Form.Item
            name={"link"}
            label={"Link to your files"}
            rules={[{ required: true, message: "Field is required" }]}>
            <Input onChange={(e) => setFormValues({ key: "link", value: e.target.value })} min={0} type="text" />
        </Form.Item>
    )
}
