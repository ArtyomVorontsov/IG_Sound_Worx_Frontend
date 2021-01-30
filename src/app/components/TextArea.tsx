import React from 'react'
import {Form} from "antd";
import TextAreaComponent from 'antd/lib/input/TextArea'

export const TextArea = ({setFormValues}) => {
    return (
        <Form.Item
            name={"description"}
            label={"Description"}
            rules={[{ required: true, message: "Field is required" }]}>
            <TextAreaComponent onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} />
        </Form.Item>
    )
}
