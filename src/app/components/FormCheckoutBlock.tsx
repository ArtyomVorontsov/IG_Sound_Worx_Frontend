import React from 'react'
import { Card, Select, Button } from 'antd'
import { FormValuesType, FieldType, CurrencyType } from '../types/interfaces';
const { Option } = Select;


type FormCheckoutProps = {
    total: number,
    price: number,
    discount: number,
    setFormValues: (field: FieldType) => void
    currency: CurrencyType
}

export const FormCheckoutBlock = ({ total, price, discount, setFormValues, currency }: FormCheckoutProps) => {
    return (

        <Card style={{ height: "300px", flex: 1, marginLeft: "50px" }}>
            <h2>Total: {total} {`${currency}`}</h2>
            <p>Price: {price}</p>
            <p>Discount: {discount}</p>

            <Select
                defaultValue={"EUR"}
                style={{ width: "100px" }}
                onChange={(e) => setFormValues({
                    key: "currency",
                    value: e.toString()
                })}>
                <Option default key={"EUR"} value={"EUR"}>EUR</Option>
                <Option key={"USD"} value={"USD"}>USD</Option>
            </Select>

            <br />
            <br />

            <Button htmlType="submit" type="primary">Checkout</Button>
        </Card>

    )
}
