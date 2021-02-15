import React, { useState } from 'react'
import { Section } from '../../components/Section';
import { Form, Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { NameEmailFields } from '../../components/NameEmailFields';
import emailjs from 'emailjs-com';
import { FieldGroup } from '../../components/FormComponents';

type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {


}

type mapDispatchProps = {

}

type ContactsProps = ownProps & mapStateProps & mapDispatchProps;


export const Contacts = ({ }: ContactsProps) => {


    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e, 'YOUR_USER_ID')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }



    const onFinish = (e) => {
        console.log(e)
        sendEmail(e)
    }

    const onFinishFailed = () => {

    }


    return (
        <>


            <Section >
                <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: "center", width: "100%", margin: "20px 0 20px 0" }}>
                    <h1 style={{ fontSize: "40px" }}>Contacts</h1>
                </div>
                <Form onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    style={{ width: "100%" }}
                    fields={
                        [

                            /*  { name: "additionalEdit", value: formValues.additionalEdit.count }, */
                        ]
                    }>
                    <FieldGroup>
                        <Form.Item
                            key={"user_email"}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            name={"user_email"}
                            label={"Email"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item
                            key={"user_name"}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            name={"user_name"}
                            label={"Full name"}
                            rules={[{ required: true, message: "Field is required" }]}>
                            <Input type="text" />
                        </Form.Item>
                    </FieldGroup>
                    <Form.Item rules={[{ required: true }]} name={"message"} label={"Body"} style={{ width: "100%" }}>
                        <TextArea />
                    </Form.Item>
                    <Button htmlType={"submit"} type={"primary"}>Submit</Button>
                </Form>
            </Section>
        </>

    )
}
