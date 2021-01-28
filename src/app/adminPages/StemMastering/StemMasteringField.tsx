import React from 'react'
import { Form, Card, InputNumber, Input } from 'antd'

export const StemMasteringField = ({stem, remove}) => {
    
    return (
        <Card>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", flexWrap: "wrap", }}>
            <p>{stem.id}</p>
                <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>

                    <Form.Item
                        name={["quantityOfStems",stem.id, "quantity", "from"]}
                        label={"from"}
                        rules={[{ required: true, message: "Field is required" }]}>
                        
                        <InputNumber style={{ width: "70px" }} type="text" />
                    </Form.Item>

                    <Form.Item
                        name={["quantityOfStems",stem.id, "quantity", "to"]}
                        label={"to"}
                        rules={[{ required: true, message: "Field is required" }]}>
                        <InputNumber style={{ width: "70px" }} type="number" />
                    </Form.Item>

                    <Form.Item
                        name={["quantityOfStems",stem.id, "id"]}
                        style={{ display: "none" }}
                    >
                        <InputNumber style={{ width: "70px" }} type="number" />
                    </Form.Item>
                </div>


                <div style={{ flex: 3, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    <Form.Item
                        name={["quantityOfStems",stem.id, "EUR"]}
                        label={"EUR"}
                        rules={[{ required: true, message: "Field is required" }]}>
                        <InputNumber type="number" />

                    </Form.Item>

                    <Form.Item
                        name={["quantityOfStems",stem.id, "USD"]}
                        label={"USD"}
                        rules={[{ required: true, message: "Field is required" }]}>
                        <InputNumber type="number" />
                    </Form.Item>
                </div>

                <Form.Item style={{ display: "none" }} name={["quantityOfStems", stem.id, "id"]}>
                    <Input type="number" />
                </Form.Item>
                <button onClick={() => remove(stem.id)}>remove</button>
            </div>


        </Card>
    )
}
