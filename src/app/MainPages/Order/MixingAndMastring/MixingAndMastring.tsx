
import React, { useState } from 'react'
import { Content } from 'antd/lib/layout/layout'
import { Form, Select, Divider } from 'antd'
import { Loader } from '../../../components/Loader'
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces'
import { FormWrapper } from '../../../components/FormComponents'
import { FormCheckoutBlock } from '../../../components/FormCheckoutBlock'
import { NameEmailFields } from '../../../components/NameEmailFields'
import { FormSelectField } from '../../../components/FormSelectField'
import { FormLinkField } from '../../../components/FormLinkField'
import {TextArea} from '../../../components/TextArea'
import { FormNumberField } from '../../../components/FormNumberField'
const { Option } = Select

type mixingAndMasteringProps = {
    children: React.ReactNode,
    formValues: FormValuesType
    setFormValues: (field: FieldType) => void
    product: { isLoaded: boolean, item: PriceItemType },
    checkout: () => void
}

export const MixingAndMastring = ({children, formValues, setFormValues, product, checkout }: mixingAndMasteringProps) => {

    const onFinish = () => {

    }

    const onFinishFailed = () => {

    }

    const [isFinish, setFinish] = useState(false);

    return (
        <Content>

            {!product.isLoaded ? <Loader /> :
                <Form
                    //name="order"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    fields={
                        [
                            { name: "full_name", value: formValues.full_name },
                            { name: "email", value: formValues.email },
                            { name: "description", value: formValues.description },
                            { name: "link", value: formValues.link },
                            { name: "additionalEdit", value: formValues.additionalEdit.count },
                        ]
                    }
                >
                    <FormWrapper>
                        <div style={{ flex: 2 }}>
                            <h1>Mixing and mastring</h1>
                            <NameEmailFields setFormValues={setFormValues} />
                            <TextArea setFormValues={setFormValues} />
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
                                label={"Mixing and mastering"}
                            >
                                {
                                    product.item.quantityOfStems.map((stem, index) => {
                                        return <Option
                                            key={stem.id} value={index}>{`${stem.quantity.from} - ${stem.quantity.to}`}</Option>
                                    })
                                }
                            </FormSelectField>
                            
                            <Divider/>
                                <FormNumberField
                                    formData={product.item.additionalEdit}
                                    name="additionalEdit"
                                    label={"Additional edit"}
                                    setFormValues={setFormValues}
                                />




                        </div>
                        <FormCheckoutBlock
                            total={formValues.total}
                            price={formValues.total}
                            discount={formValues.discount}
                            currency={formValues.currency}
                            setFormValues={setFormValues}
                            formValues={formValues}
                            isFinish={isFinish}
                            checkout={checkout}
                        />
                    </FormWrapper>
                </Form>
            }
        </Content>

    )
}
