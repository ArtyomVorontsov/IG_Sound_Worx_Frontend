import React, { ChangeEvent } from 'react';
import { Form, Input } from "antd";
import { PriceItemType, FieldType } from '../types/interfaces';


// type FormNumberField = {
//     formData: { isLoaded: boolean, item: PriceItemType }
//     setFormValues: (field: FieldType) => void
//     name: string
//     label: string
// }

type FormNumberField = {
    formData: any
    setFormValues: any
    name: string
    label: string
    required?: boolean
}


// export const FormNumberField = ({ formData, setFormValues, name, label }: FormNumberField) => {
//     return (
//         <Form.Item
//             name={name}
//             label={label}
//             rules={[{ required: true, message: "Field is required" }]}>
//             <Input onChange={(e) => setFormValues({
//                 key: e.target.id,
//                 value: {
//                     count: Number(e.target.value), price: {
//                         EUR: Number(formData.item.additionalEdit.EUR) * Number(e.target.value),
//                         USD: Number(formData.item.additionalEdit.USD) * Number(e.target.value)
//                     }
//                 }
//             })} min={0} type="number" />
//         </Form.Item>
//     )
// }




export const FormNumberField = ({ formData, setFormValues, name, label, required = true }: FormNumberField) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[{ required: required, message: "Field is required" }]}>
            <Input onChange={(e) => setFormValues({
                key: e.target.id,
                value: {
                    count: Number(e.target.value), 
                    price: {
                        EUR: Number(formData.EUR) * Number(e.target.value),
                        USD: Number(formData.USD) * Number(e.target.value)
                    }
                }
            })} min={0} type="number" />
        </Form.Item>
    )
}

