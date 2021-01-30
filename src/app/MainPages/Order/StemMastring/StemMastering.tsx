import React from 'react'
import { Form, Input, Switch, Divider, Button, Card, Select } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import { FormWrapper, FieldGroup } from '../../../components/FormComponents'
import TextArea from 'antd/lib/input/TextArea'
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces'
import { FormCheckoutBlock } from '../../../components/FormCheckoutBlock'
import { FormNumberField } from '../../../components/FormNumberField'
import { FormSelectField } from '../../../components/FormSelectField'
import { NameEmailFields } from '../../../components/NameEmailFields'
import { FormLinkField } from '../../../components/FormLinkField'
import { Loader } from '../../../components/Loader'
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



    return (
        !stemMastering.isLoaded ? <Loader/>:
            <Content>
              
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    name="order"
                    fields={
                        [
                            { name: "full_name", value: formValues.full_name },
                            { name: "email", value: formValues.email },
                            { name: "description", value: formValues.description },

                            { name: "stemMastering", value: formValues.stemMastering.count },
                            { name: "additionalEdit", value: formValues.additionalEdit.count },
                            { name: "link", value: formValues.link}
                        ]
                    }

                >
                    <FormWrapper>
                        <div style={{ flex: 2 }}>
                        <h1>Stem mastering</h1>
                           <NameEmailFields setFormValues={setFormValues}/>

                            <Form.Item
                                name={"description"}
                                label={"Description"}
                                rules={[{ required: true, message: "Field is required" }]}>
                                <TextArea onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} />
                            </Form.Item>

                            <FormLinkField setFormValues={setFormValues}/>

                            <Divider />



                            <FormSelectField setFormValues={(e: string) => setFormValues(
                                {
                                    key: "stemMastering",
                                    value: {
                                        count: Number(stemMastering.item.quantityOfStems[Number(e)].quantity.to),
                                        price: {
                                            EUR: Number(stemMastering.item.quantityOfStems[Number(e)].EUR),
                                            USD: Number(stemMastering.item.quantityOfStems[Number(e)].USD),
                                        }
                                    }
                                })}
                                name={"stemMastering"}
                                label={"Stem mastering"}
                            >

                                {
                                    stemMastering.item.quantityOfStems.map((stem, index) => {
                                        return <Option
                                            key={stem.id} value={index}>{`${stem.quantity.from} - ${stem.quantity.to}`}</Option>
                                    })
                                }
                            </FormSelectField>


                            <FormNumberField
                                formData={stemMastering.item.additionalEdit}
                                setFormValues={setFormValues}
                                name={"additionalEdit"}
                                label={"Additional edit"}
                            />


                        </div>
                        <FormCheckoutBlock
                            setFormValues={setFormValues}
                            price={formValues.price}
                            total={formValues.total}
                            discount={formValues.discount}
                            currency={formValues.currency} />
                    </FormWrapper>
                </Form>
            </Content>

    )
}


