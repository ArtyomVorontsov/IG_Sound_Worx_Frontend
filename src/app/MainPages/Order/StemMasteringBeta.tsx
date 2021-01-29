import React from 'react'
import { Form, Input, Switch, Divider, Button, Card } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import { FormWrapper, FieldGroup } from '../../components/FormComponents'
import TextArea from 'antd/lib/input/TextArea'
import { FormValuesType, FieldType, PriceItemType } from '../../types/interfaces'



type StemMasteringProps = {
    children: React.ReactNode;
    setFormValues: (field: FieldType) => void
    formValues: FormValuesType
    stemMastering: { isLoaded: boolean, item: PriceItemType }
}

export const StemMastering = ({ setFormValues, formValues, stemMastering }: StemMasteringProps) => {
    debugger
    const onFinish = (formValues: FormValuesType) => {
        console.log(formValues)
    }

    const onFinishFailed = () => {

    }


    return (
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
                        { name: "promocode", value: formValues.promocode },

                        { name: "stereoMastering", value: formValues.stereoMastering.count },
                        { name: "stemMastering", value: formValues.stemMastering.count },
                        { name: "additionalMix", value: formValues.additionalMix.count },
                        { name: "additionalStem", value: formValues.additionalStem.count },

                        { name: "remixing", value: formValues.remixing.count },
                        { name: "productionAssistance", value: formValues.productionAssistance.count },
                        { name: "trackProduction", value: formValues.trackProduction.count },
                    ]
                }

            >
                <FormWrapper>
                    <div style={{ flex: 2 }}>
                        <FieldGroup>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"full_name"}
                                label={"Full name"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} type="text" />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"email"}
                                label={"Email"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} type="email" />
                            </Form.Item>
                        </FieldGroup>

                        <Form.Item
                            name={"description"}
                            label={"Description"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <TextArea onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} />
                        </Form.Item>

                        <Divider />


                        <FieldGroup>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"stereoMastering"}
                                label={"Stereo mastering"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues({
                                    key: e.target.id,
                                    value: {
                                        count: Number(e.target.value), price: Number(stemMastering.item.EUR) * Number(e.target.value)
                                    }
                                })} min={0} type="number" />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"stemMastering"}
                                label={"Stem mastering"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues({
                                    key: e.target.id,
                                    value: {
                                        count: Number(e.target.value), price: Number(stemMastering.item.EUR) * Number(e.target.value)
                                    }
                                })} min={0} type="number" />
                            </Form.Item>
                        </FieldGroup>


                        <Form.Item
                            name={"additionalMix"}
                            label={"Additional mix"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <Input onChange={(e) => setFormValues({
                                    key: e.target.id,
                                    value: {
                                        count: Number(e.target.value), price: Number(stemMastering.item.EUR) * Number(e.target.value)
                                    }
                                })} min={0} type="number" />
                        </Form.Item>

                        <Form.Item
                            name={"additionalStem"}
                            label={"Additional stem"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <Input onChange={(e) => setFormValues({
                                    key: e.target.id,
                                    value: {
                                        count: Number(e.target.value), price: Number(stemMastering.item.EUR) * Number(e.target.value)
                                    }
                                })} min={0} type="number" />
                        </Form.Item>

                        <Divider />

                        <FieldGroup>
                            <Form.Item
                                style={{ flex: 5 }}
                                name={"remixing"}
                                label={"Remixing"}

                                rules={[{ required: false }]}

                            >
                                <Switch onChange={(e) => setFormValues({ key: "remixing", value: e })} />
                            </Form.Item>

                            <Form.Item
                                style={{ flex: 5 }}
                                name={"trackProduction"}
                                label={"Track production"}
                                rules={[{ required: false }]}
                            >
                                <Switch onChange={(e) => setFormValues({ key: "trackProduction", value: e })} />
                            </Form.Item>

                            <Form.Item
                                style={{ flex: 5 }}
                                name={"productionAssistance"}
                                label={"Production assistance"}
                                rules={[{ required: false }]}
                            >
                                <Switch onChange={(e) => setFormValues({ key: "productionAssistance", value: e })} />
                            </Form.Item>


                        </FieldGroup>
                        <Divider />

                    </div>

                    <Card style={{ height: "300px", flex: 1, marginLeft: "50px" }}>
                        <h2>Total: {formValues.total}</h2>
                        <p>Price: {formValues.price}</p>
                        <p>Discount: {formValues.discount}</p>
                        <Form.Item
                            style={{ width: 250 }}
                            name={"promocode"}
                            label={"Promocode"}
                            rules={[{ required: false, message: "Field is required" }]}>
                            <Input onChange={(e) => setFormValues({
                                    key: e.target.id,
                                    value: {
                                        count: Number(e.target.value), price: Number(stemMastering.item.EUR) * Number(e.target.value)
                                    }
                                })} min={0} type="text" />
                        </Form.Item>
                        <Button htmlType="submit" type="primary">Checkout</Button>
                    </Card>
                </FormWrapper>
            </Form>



        </Content>



    )
}


