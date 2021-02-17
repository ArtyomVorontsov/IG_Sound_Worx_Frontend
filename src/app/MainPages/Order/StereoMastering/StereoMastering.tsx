import React, { ChangeEvent, useState, useEffect } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Form, Select, Card, Input, Divider } from "antd";
import { FormValuesType, FieldType, PriceItemType } from '../../../types/interfaces';
import { FormWrapper } from '../../../components/FormComponents';
import FormCheckoutBlock from '../../../components/FormCheckoutBlock';
import { NameEmailFields } from '../../../components/NameEmailFields';
import { FormNumberField } from '../../../components/FormNumberField';
import { TextArea } from "../../../components/TextArea";
import { FormLinkField } from '../../../components/FormLinkField';
import { Loader } from "../../../components/Loader";



type StereoMasteringProps = {
    children: React.ReactNode,
    formValues: FormValuesType
    setFormValues: (field: FieldType) => void
    product: { isLoaded: boolean, item: PriceItemType },
    checkout: () => void
    clearFormValues: () => void
}

export const StereoMastering = ({clearFormValues, formValues, setFormValues, product, checkout }: StereoMasteringProps) => {

    const [isCheckoutBlockOpen, setIsCheckoutBlockOpen] = useState(false);
    

    const closeCheckoutBlock = () => {
        setIsCheckoutBlockOpen(false)
    }

    const onFinish = () => {
        setIsCheckoutBlockOpen(true);
    }

    const onFinishFailed = () => {
        setIsCheckoutBlockOpen(false)
    }

    useEffect(()=>{
        clearFormValues()
    },[])

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

                            { name: "stereoMastering", value: formValues.stereoMastering.count },
                            { name: "additionalEdit", value: formValues.additionalEdit.count === 0 ? "" : formValues.additionalEdit.count },
                        ]
                    }
                >
                    <FormWrapper>
                        <div style={{ flex: 2 }}>
                            <h1>Stereo mastring</h1>
                            <NameEmailFields setFormValues={setFormValues} />

                            <TextArea setFormValues={setFormValues} />
                            <FormLinkField setFormValues={setFormValues} />

                            <FormNumberField
                                formData={product.item}
                                setFormValues={setFormValues}
                                name={"stereoMastering"}
                                label={"Quantity of songs"} />

                            <Divider />

                            <FormNumberField
                                formData={product.item.additionalEdit}
                                setFormValues={setFormValues}
                                name={"additionalEdit"}
                                label={"Additional editing"}
                            />
                        </div>
                        <FormCheckoutBlock
                            formValues={formValues}
                            setFormValues={setFormValues}
                            close={closeCheckoutBlock}
                            isCheckoutBlockOpen={isCheckoutBlockOpen}
                            currentProduct={"stereoMastering"}
                            checkout={checkout}
                        />

                    </FormWrapper>
                </Form>
            }
        </Content>
    )
}
