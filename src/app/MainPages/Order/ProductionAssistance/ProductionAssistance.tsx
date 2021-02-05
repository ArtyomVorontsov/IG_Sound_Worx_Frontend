import React, { useEffect } from 'react'
import { Content } from 'antd/lib/layout/layout'
import { Form, Select, Divider, Button } from 'antd'
import { Loader } from '../../../components/Loader'
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces'
import { FormWrapper } from '../../../components/FormComponents'
import { NameEmailFields } from '../../../components/NameEmailFields'
import { FormSelectField } from '../../../components/FormSelectField'
import { FormLinkField } from '../../../components/FormLinkField'
import {TextArea} from '../../../components/TextArea'
import { FormNumberField } from '../../../components/FormNumberField'
const { Option } = Select

type ProductionAssistanceProps = {
    children: React.ReactNode,
    formValues: FormValuesType
    setFormValues: (field: FieldType) => void
    product: { isLoaded: boolean, item: PriceItemType },
    checkout: () => void
    clearFormValues: () => void
}

export const ProductionAssistance = ({clearFormValues, product, children, formValues, setFormValues, checkout }: ProductionAssistanceProps) => {

    const onFinish = () => {
        checkout();
    }

    const onFinishFailed = () => {

    }

    useEffect(() => {
        clearFormValues();
      }, [])

    return (
        <Content>

            {!product.isLoaded ? <Loader /> :
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
                        <div style={{ flex: 2 }}>
                            <h1>Production assistance</h1>
                            <NameEmailFields setFormValues={setFormValues} />
                            <TextArea setFormValues={setFormValues} />
                            <FormLinkField setFormValues={setFormValues} />
                            <Button htmlType="submit">Order now</Button>
                        </div>
                      
                    </FormWrapper>
                </Form>
            }
        </Content>

    )
}
