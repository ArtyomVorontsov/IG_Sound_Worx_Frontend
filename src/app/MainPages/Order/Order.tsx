import React from 'react'
import { Form, Input, Switch, Divider, Button, Card } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import { FormWrapper, FieldGroup } from '../../components/FormComponents'
import TextArea from 'antd/lib/input/TextArea'
import { FormValuesType, StateType } from '../../types/interfaces'
import { connect } from 'react-redux'
import { setFormValuesThunk, setFormContactValuesThunk } from "../../redux/reducers/FormReducer"



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    values: FormValuesType
}

type mapDispatchProps = {
    setFormValues: (values: { value: string | number | boolean, id: string }) => void
    setFormContactValues: (values: { value: string, id: string }) => void
}

type OrderProps = ownProps & mapStateProps & mapDispatchProps;




const Order = ({ setFormValues, values, setFormContactValues }: OrderProps) => {

    const onFinish = (values: any) => {
        console.log(values)
    }

    const onFinishFailed = () => {

    }


    return (
        <Content>

            <Form
                onFinish={onFinish}
                layout="vertical"
                name="order"
                fields={
                    [
                        { name: "full_name", value: values.full_name },
                        { name: "email", value: values.email },
                        { name: "description", value: values.description },
                        { name: "promocode", value: values.promocode },

                        { name: "stereoMastering", value: values.stereoMastering.count },
                        { name: "stemMastering", value: values.stemMastering.count },
                        { name: "additionalMix", value: values.additionalMix.count },
                        { name: "additionalStem", value: values.additionalStem.count },

                        { name: "remixing", value: values.remixing.count },
                        { name: "productionAssistance", value: values.productionAssistance.count },
                        { name: "trackProduction", value: values.trackProduction.count },
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
                                <Input onChange={(e) => setFormContactValues(e.target)} type="text" />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"email"}
                                label={"Email"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormContactValues(e.target)} type="email" />
                            </Form.Item>
                        </FieldGroup>

                        <Form.Item
                            name={"description"}
                            label={"Description"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <TextArea onChange={(e) => setFormContactValues(e.target)} />
                        </Form.Item>

                        <Divider />


                        <FieldGroup>
                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"stereoMastering"}
                                label={"Stereo mastering"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues(e.target)} min={0} type="number" />
                            </Form.Item>

                            <Form.Item
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                name={"stemMastering"}
                                label={"Stem mastering"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <Input onChange={(e) => setFormValues(e.target)} min={0} type="number" />
                            </Form.Item>
                        </FieldGroup>


                        <Form.Item
                            name={"additionalMix"}
                            label={"Additional mix"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <Input onChange={(e) => setFormValues(e.target)} min={0} type="number" />
                        </Form.Item>

                        <Form.Item
                            name={"additionalStem"}
                            label={"Additional stem"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <Input onChange={(e) => setFormValues(e.target)} min={0} type="number" />
                        </Form.Item>

                        <Divider />

                        <FieldGroup>
                            <Form.Item
                                style={{ flex: 5 }}
                                name={"remixing"}
                                label={"Remixing"}

                                rules={[{ required: false }]}

                            >
                                <Switch onChange={(e) => setFormValues({ id: "order_remixing", value: e })} />
                            </Form.Item>

                            <Form.Item
                                style={{ flex: 5 }}
                                name={"trackProduction"}
                                label={"Track production"}
                                rules={[{ required: false }]}
                            >
                                <Switch onChange={(e) => setFormValues({ id: "order_trackProduction", value: e })} />
                            </Form.Item>

                            <Form.Item
                                style={{ flex: 5 }}
                                name={"productionAssistance"}
                                label={"Production assistance"}
                                rules={[{ required: false }]}
                            >
                                <Switch onChange={(e) => setFormValues({ id: "order_productionAssistance", value: e })} />
                            </Form.Item>


                        </FieldGroup>
                        <Divider />

                    </div>

                    <Card style={{ height: "300px", flex: 1, marginLeft: "50px" }}>
                        <h2>Total: {values.total}</h2>
                        <p>Price: {values.price}</p>
                        <p>Discount: {values.discount}</p>
                        <Form.Item
                            style={{ width: 250 }}
                            name={"promocode"}
                            label={"Promocode"}
                            rules={[{ required: false, message: "Field is required" }]}>
                            <Input onChange={(e) => setFormContactValues(e.target)} min={0} type="text" />
                        </Form.Item>
                        <Button htmlType="submit" type="primary">Checkout</Button>
                    </Card>
                </FormWrapper>
            </Form>



        </Content>



    )
}


const mapStateToProps = (state: StateType) => {
    return {
        values: state.FormReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setFormValues: (field: { value: string | number | boolean, id: string }) => dispatch(setFormValuesThunk(field)),
        setFormContactValues: (field: { value: string, id: string }) => dispatch(setFormContactValuesThunk(field))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);