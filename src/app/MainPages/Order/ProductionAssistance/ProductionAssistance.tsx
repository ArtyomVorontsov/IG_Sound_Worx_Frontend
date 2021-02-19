import React, { useEffect, useState } from 'react'
import { Content } from 'antd/lib/layout/layout'
import { Form, Select, Divider, Button } from 'antd'
import { Loader } from '../../../components/Loader'
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces'
import { FormWrapper } from '../../../components/FormComponents'
import { NameEmailFields } from '../../../components/NameEmailFields'
import { FormSelectField } from '../../../components/FormSelectField'
import { FormLinkField } from '../../../components/FormLinkField'
import { TextArea } from '../../../components/TextArea'
import { FormNumberField } from '../../../components/FormNumberField'
const { Option } = Select

type ProductionAssistanceProps = {
    children: React.ReactNode,
    formValues: FormValuesType
    setFormValues: (field: FieldType) => void
    product: { isLoaded: boolean, item: PriceItemType },
    checkout: () => any
    clearFormValues: () => void
}

export const ProductionAssistance = ({ clearFormValues, product, children, formValues, setFormValues, checkout }: ProductionAssistanceProps) => {

    const [isSubmited, setSubmited] = useState(false);

    const onFinish = async () => {
        try {
            checkout().then(() => {
                setSubmited(true)
            });

        } catch (error) {

        }
    }

    const onFinishFailed = () => {

    }

    useEffect(() => {
        clearFormValues();
        window.scrollTo(0, 0);
    }, [])

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
                    ]
                }
            >

                <FormWrapper>
                    {!product.isLoaded ? <Loader />
                        : isSubmited ?
                            <div>
                                <h1>Your order is received, thank you.</h1>
                            </div>
                            :
                            <div style={{ flex: 2 }}>
                                <h1>Production assistance</h1>
                                <NameEmailFields setFormValues={setFormValues} />
                                <TextArea setFormValues={setFormValues} />
                                <FormLinkField setFormValues={setFormValues} />
                                <Button htmlType="submit">Order now</Button>
                            </div>
                    }
                </FormWrapper>

            </Form>

        </Content>

    )
}
