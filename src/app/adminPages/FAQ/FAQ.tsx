import React, { useEffect, useState } from 'react'
import { PageHeader, PageContent, PageTitle, CardWrapper, PageFooter } from "../../components/adminStyledComponents"
import { Divider, Card, Form, Input, Button, Space } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Layout, { Footer } from 'antd/lib/layout/layout'
import { DeleteOutlined } from "@ant-design/icons"
import { connect } from 'react-redux'
import { StateType, FAQType } from '../../types/interfaces'
import { getFAQThunk, addFAQThunk, deleteFAQThunk } from '../../redux/reducers/FAQReducer'
import { Loader } from '../../components/Loader'
import { getFAQSelector, getIsLoadedFAQ } from '../../selectors/selectors'



type OwnProps = {
    children: React.ReactNode
}

type MapStateProps = {
    FAQ: Array<FAQType>,
    isLoaded: boolean
}

type MapDispatchProps = {
    getFAQ: () => void,
    addFAQ: (body: string, title: string) => void,
    deleteFAQ: (id: string) => void
}

type FAQProps = OwnProps & MapStateProps & MapDispatchProps

const FAQ = ({ FAQ, getFAQ, addFAQ, deleteFAQ, isLoaded }: FAQProps) => {

    const onFinish = ({ body, title }: { body: string, title: string }) => {
        addFAQ(body, title);
    }

    const onFinishFailed = () => {

    }

    const [titleValue, setTitleValue] = useState("");
    const [bodyValue, setBodyValue] = useState("");

    
    useEffect(() => {
        if (!isLoaded) getFAQ()
    }, [])

    useEffect(()=>{
        setBodyValue("");
        setTitleValue("");
        console.log("hi")
    }, [FAQ])

    console.log(titleValue)

    return (
        <Layout>
            <PageContent>
                <PageHeader>
                    <PageTitle>FAQ</PageTitle>
                </PageHeader>
                <Divider />
                <CardWrapper>
                    <Space style={{ display: "flex", width: "100%", }} direction="vertical">
                        <Card style={{ width: "100%" }}>

                            <Form
                                name="faq"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                fields = {
                                    [
                                        {name: "title", value: titleValue},
                                        {name: "body", value: bodyValue}
                                    ]
                                    
                                }
                            >
                                <Form.Item
                                    name={"title"}
                                    label={"Title"}
                                    rules={[{ required: true, message: "Field is required." }]}
                                >
                                    <Input 
                                    onChange={e => setTitleValue(e.target.value)} />
                                </Form.Item>
                                <Form.Item
                                    required name={"body"}
                                    label={"Body"}
                                    rules={[{ required: true, message: "Field is required." }]}>
                                    <TextArea 
                                    onChange={e => setBodyValue(e.target.value)} 
                                    draggable={false} 
                                    rows={4} />
                                </Form.Item>
                                <Button htmlType="submit" type="primary">Submit</Button>
                            </Form>


                        </Card>
                        <Divider />

                        
                        {
                            FAQ.map((faq: FAQType) => {
                                return <Card key={faq.id}>
                                    <Button onClick={() => deleteFAQ(faq.id)}
                                        style={{
                                            position: "absolute",
                                            top: "10px", right: "10px"
                                        }}
                                        type={"primary"} size={"middle"}
                                        shape="circle" icon={<DeleteOutlined />} />

                                    <h2>Title:</h2>
                                    <p>{faq.title}</p>
                                    <br />
                                    <h2>Body:</h2>
                                    <p> {faq.body}</p>
                                </Card>
                            })
                        }

                    </Space>
                    {isLoaded ? null : <Loader />}
                </CardWrapper>
                <PageFooter>

                </PageFooter>
            </PageContent>

        </Layout>

    )
}


const mapStateToProps = (state: StateType) => {
    return {
        FAQ: getFAQSelector(state),
        isLoaded: getIsLoadedFAQ(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFAQ: () => { dispatch(getFAQThunk()) },
        addFAQ: (body: string, title: string) => { dispatch(addFAQThunk(body, title)) },
        deleteFAQ: (id: string) => { dispatch(deleteFAQThunk(id)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FAQ);