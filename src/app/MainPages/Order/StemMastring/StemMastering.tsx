import React, { useState, useEffect } from 'react'
import { Form, Input, Switch, Divider, Button, Card, Select } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import { FormWrapper, FieldGroup } from '../../../components/FormComponents'
import TextArea from 'antd/lib/input/TextArea'
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces'
import FormCheckoutBlock from '../../../components/FormCheckoutBlock'
import { FormNumberField } from '../../../components/FormNumberField'
import { FormSelectField } from '../../../components/FormSelectField'
import { NameEmailFields } from '../../../components/NameEmailFields'
import { FormLinkField } from '../../../components/FormLinkField'
import { Loader } from '../../../components/Loader'
const { Option } = Select

import Style from "styled-components";

const FieldsWrapper = Style.div`
    width: 70%; 
    position: relative;

    @media only screen and (max-width: 600px) {
        margin: 0;
        width: 100%;
    }
`

type StemMasteringProps = {
    children: React.ReactNode;
    setFormValues: (field: FieldType) => void
    formValues: FormValuesType
    product: { isLoaded: boolean, item: PriceItemType },
    checkout: () => void
    clearFormValues: () => void
}

export const StemMastering = ({ clearFormValues, setFormValues, formValues, product, checkout }: StemMasteringProps) => {

    const [isCheckoutBlockOpen, setIsCheckoutBlockOpen] = useState(false);

    const onFinish = (formValues: FormValuesType) => {
        setIsCheckoutBlockOpen(true)
    }

    const onFinishFailed = () => {
        setIsCheckoutBlockOpen(false)
    }

    const closeCheckoutBlock = () => {
        setIsCheckoutBlockOpen(false)
    }

    useEffect(() => {
        clearFormValues()
        window.scrollTo(0, 0);
    }, [])

    return (

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
                        { name: "additionalEdit", value: formValues.additionalEdit.count === 0 ? "" : formValues.additionalEdit.count },
                        { name: "link", value: formValues.link }
                    ]
                }

            >
                <FormWrapper>
                    {!product.isLoaded ? <Loader /> :
                        <>
                            <FieldsWrapper>
                                <h1>Stem mastering</h1>
                                <NameEmailFields setFormValues={setFormValues} />

                                <FormLinkField setFormValues={setFormValues} />

                                <Divider />

                                <FormSelectField setFormValues={(e: string) => setFormValues(
                                    {
                                        key: "stemMastering",
                                        value: {
                                            count: Number(product.item.quantityOfStems[Number(e)].quantity.to),
                                            price: {
                                                EUR: Number(product.item.quantityOfStems[Number(e)].EUR),
                                                USD: Number(product.item.quantityOfStems[Number(e)].USD),
                                            }
                                        }
                                    })}
                                    name={"stemMastering"}
                                    label={"Stems quantity"}
                                >

                                    {
                                        product.item.quantityOfStems.map((stem, index) => {
                                            return <Option
                                                key={stem.id} value={index}>{`${stem.quantity.from} - ${stem.quantity.to}`}</Option>
                                        })
                                    }
                                </FormSelectField>


                                <FormNumberField
                                    required={false}
                                    formData={product.item.additionalEdit}
                                    setFormValues={setFormValues}
                                    name={"additionalEdit"}
                                    label={"Additional edit"}
                                />

                                <Form.Item
                                    name={"description"}
                                    label={"Description"}
                                    rules={[{ required: true, message: "Field is required" }]}>
                                    <TextArea onChange={(e) => setFormValues({ key: e.target.id, value: e.target.value })} />
                                </Form.Item>


                            </FieldsWrapper>



                            <FormCheckoutBlock
                                close={closeCheckoutBlock}
                                isCheckoutBlockOpen={isCheckoutBlockOpen}
                                setFormValues={setFormValues}
                                formValues={formValues}
                                currentProduct={"stemMastering"}
                                checkout={checkout}
                            />


                        </>
                    }
                </FormWrapper>
            </Form>
        </Content>

    )
}


