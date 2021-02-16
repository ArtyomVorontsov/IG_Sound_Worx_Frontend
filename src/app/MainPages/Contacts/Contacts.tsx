import React, { useState, useEffect, FormEvent } from 'react'
import { Section } from '../../components/Section';
import { Form, Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { NameEmailFields } from '../../components/NameEmailFields';
import emailjs, { init } from 'emailjs-com';
import { FieldGroup } from '../../components/FormComponents';
import { Loader } from "../../components/Loader";

import emailJsPrivateData from "../../../privateData/emailJs"

type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {


}

type mapDispatchProps = {

}

type ContactsProps = ownProps & mapStateProps & mapDispatchProps;


export const Contacts = ({ }: ContactsProps) => {


    const [isLoading, setLoading] = useState(false);
    const [isSended, setSended] = useState(false);

    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

       
        emailjs.sendForm(emailJsPrivateData.service, 
            emailJsPrivateData.templateId, 
             //@ts-ignore
            e.target, 
            emailJsPrivateData.userId)
            .then((result) => {
                setLoading(false);
                setSended(true)
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }



    const onFinish = (e) => {
        console.log(e)

        if (!e.target.message.value ||
            !e.target.user_name.value ||
            !e.target.user_email.value) {
            return
        }
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
                {isLoading ? <Loader /> :

                    isSended ? <div>
                        <h1>Your message is received, thank you.</h1>
                    </div>
                        :
                        <Form onSubmitCapture={onFinish}
                            //onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            style={{ width: "100%" }}
                        >
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
                }
            </Section>
        </>

    )
}
