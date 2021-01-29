import React from 'react'
import { Form, Input, Switch, Divider, Button, Card, Select } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import { FormWrapper, FieldGroup } from '../../components/FormComponents'
import TextArea from 'antd/lib/input/TextArea'
import { FormValuesType, FieldType, PriceItemType } from '../../types/interfaces'
const { Option } = Select


type StemMasteringProps = {
    children: React.ReactNode;
    setFormValues: (field: FieldType) => void
    formValues: FormValuesType
    stemMastering: { isLoaded: boolean, item: PriceItemType },
    checkout: () => void
}

export const StemMastering = ({ setFormValues, formValues, stemMastering, checkout }: StemMasteringProps) => {
    const onFinish = (formValues: FormValuesType) => {
        checkout()
    }

    const onFinishFailed = () => {

    }

    const contactFields = [
        { name: "full_name", label: "Full name" },
        { name: "email", label: "Email" },
    ]


    return (
        !stemMastering.isLoaded ? <p>loading</p> :
            <Content>
                <h1>Stem mastering</h1>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    name="order"
                    fields={
                        [
                            { name: "full_name", value: formValues.full_name },
                            { name: "email", value: formValues.email },
                            { name: "description", value: formValues.description },

                            { name: "stemMastering", value: formValues.stemMastering.count },
                            { name: "additionalEdit", value: formValues.additionalEdit.count },
                        ]
                    }

                >
                    <FormWrapper>
                        <div style={{ flex: 2 }}>
                            <FieldGroup>
                                {
                                    contactFields.map((field) => {
                                        return <Form.Item
                                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                            name={field.name}
                                            label={field.label}
                                            rules={[{ required: true, message: "Field is required" }]}>
                                            <Input onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} type="text" />
                                        </Form.Item>
                                    })
                                }


                            </FieldGroup>

                            <Form.Item
                                name={"description"}
                                label={"Description"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <TextArea onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} />
                            </Form.Item>

                            <Divider />


                            <Form.Item
                                name={"stemMastering"}
                                label={"Stem mastering"}
                                rules={[{ required: true, message: "Field is required" }]}>

                                <Select
                                    onChange={(e) => setFormValues({
                                        key: "stemMastering",
                                        value: {
                                            count: Number(stemMastering.item.quantityOfStems[Number(e)].quantity.to),
                                            price: {
                                                EUR: Number(stemMastering.item.quantityOfStems[Number(e)].EUR),
                                                USD: Number(stemMastering.item.quantityOfStems[Number(e)].USD),
                                            }
                                        }
                                    })}>
                                    {
                                        stemMastering.item.quantityOfStems.map((stem, index) => {
                                            return <Option
                                                key={stem.id} value={index}>{`${stem.quantity.from} - ${stem.quantity.to}`}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>


                            <Form.Item
                                name={"additionalEdit"}
                                label={"Additional edit"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues({
                                    key: e.target.id,
                                    value: {
                                        count: Number(e.target.value), price: {
                                            EUR: Number(stemMastering.item.additionalEdit.EUR) * Number(e.target.value),
                                            USD: Number(stemMastering.item.additionalEdit.USD) * Number(e.target.value)
                                        }
                                    }
                                })} min={0} type="number" />
                            </Form.Item>


                        </div>

                        <Card style={{ height: "300px", flex: 1, marginLeft: "50px" }}>
                            <h2>Total: {formValues.total}</h2>
                            <p>Price: {formValues.price}</p>
                            <p>Discount: {formValues.discount}</p>

                            <Select
                                style={{width: "100px"}}
                                onChange={(e) => setFormValues({
                                    key: "currency",
                                    value: e.toString()
                                })}>
                                <Option key={"EUR"} value={"EUR"}>EUR</Option>
                                <Option key={"USD"} value={"USD"}>USD</Option>
                            </Select>

                            <br/>
                            <br/>

                            <Button htmlType="submit" type="primary">Checkout</Button>
                        </Card>
                    </FormWrapper>
                </Form>



            </Content>



    )
}


