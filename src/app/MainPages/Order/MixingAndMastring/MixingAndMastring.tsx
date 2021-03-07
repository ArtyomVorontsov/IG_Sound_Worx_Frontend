import React, { useState, useEffect } from 'react'
import { Content } from 'antd/lib/layout/layout'
import { Form, Select, Divider } from 'antd'
import { Loader } from '../../../components/Loader'
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces'
import { FormWrapper } from '../../../components/FormComponents'
import FormCheckoutBlock from '../../../components/FormCheckoutBlock'
import { NameEmailFields } from '../../../components/NameEmailFields'
import { FormSelectField } from '../../../components/FormSelectField'
import { FormLinkField } from '../../../components/FormLinkField'
import { TextArea } from '../../../components/TextArea'
import { FormNumberField } from '../../../components/FormNumberField'
const { Option } = Select

type mixingAndMasteringProps = {
    children: React.ReactNode,
    formValues: FormValuesType
    setFormValues: (field: FieldType) => void
    product: { isLoaded: boolean, item: PriceItemType }
    checkout: () => void
    clearFormValues: () => void
}

export const MixingAndMastring = ({ clearFormValues, children, formValues, setFormValues, product, checkout }: mixingAndMasteringProps) => {

    const [isCheckoutBlockOpen, setIsCheckoutBlockOpen] = useState(false);

    const closeCheckoutBlock = () => {
        setIsCheckoutBlockOpen(false)
    }

    const onFinish = (formValues: FormValuesType) => {
        setIsCheckoutBlockOpen(true);
    }

    const onFinishFailed = () => {
        setIsCheckoutBlockOpen(false)
    }

    useEffect(() => {
        clearFormValues();

        //initial value dispatch
        if (product.item) setFormValues({
            key: "mixingAndMastering",
            value: {
                count: Number(product.item.quantityOfStems[0].quantity.to),
                price: {
                    EUR: Number(product.item.quantityOfStems[0].EUR),
                    USD: Number(product.item.quantityOfStems[0].USD),
                }
            }
        }
        )

        window.scrollTo(0, 0);
    }, [product])

    return (
        <Content>

            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                fields={
                    [
                        { name: "full_name", value: formValues.full_name },
                        { name: "email", value: formValues.email },
                        { name: "description", value: formValues.description },
                        { name: "link", value: formValues.link },

                        { name: "mixingAndMastering", value: formValues.mixingAndMastering.count === 0 ? "" : formValues.mixingAndMastering.count },
                        { name: "additionalEdit", value: formValues.additionalEdit.count === 0 ? "" : formValues.additionalEdit.count },
                    ]
                }
            >
                <FormWrapper>
                    {!product.isLoaded ? <Loader /> :
                        <>
                            <div style={{ flex: 2 }}>
                                <h1>Mixing and mastring</h1>
                                <NameEmailFields setFormValues={setFormValues} />
                                <FormLinkField setFormValues={setFormValues} />

                                <FormSelectField setFormValues={(e: string) => setFormValues(
                                    {
                                        key: "mixingAndMastering",
                                        value: {
                                            count: Number(product.item.quantityOfStems[Number(e)].quantity.to),
                                            price: {
                                                EUR: Number(product.item.quantityOfStems[Number(e)].EUR),
                                                USD: Number(product.item.quantityOfStems[Number(e)].USD),
                                            }
                                        }
                                    })}
                                    name={"mixingAndMastering"}
                                    label={"Quantity of stems"}
                                >
                                    {
                                        product.item.quantityOfStems.map((stem, index) => {
                                            return <Option
                                                key={stem.id} value={index}>{`${stem.quantity.from} - ${stem.quantity.to}`}</Option>
                                        })
                                    }
                                </FormSelectField>

                                <Divider />
                                <FormNumberField
                                    required={false}
                                    formData={product.item.additionalEdit}
                                    name="additionalEdit"
                                    label={"Additional edit"}
                                    setFormValues={setFormValues}
                                />
                                <TextArea setFormValues={setFormValues} />
                            </div>
                            <FormCheckoutBlock
                                setFormValues={setFormValues}
                                formValues={formValues}
                                currentProduct={"mixingAndMastering"}
                                isCheckoutBlockOpen={isCheckoutBlockOpen}
                                close={closeCheckoutBlock}
                                checkout={checkout}
                            />
                        </>
                    }
                </FormWrapper>
            </Form>

        </Content>

    )
}
