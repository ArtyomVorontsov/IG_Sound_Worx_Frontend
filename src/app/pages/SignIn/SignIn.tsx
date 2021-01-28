import React from 'react';
import { Form, Input, Button, Row, Col, Divider } from "antd";
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateType } from '../../types/interfaces';
import { signInThunk } from '../../redux/reducers/LoginReducer';
import { getLoginDataSelector } from '../../selectors/selectors';



type ownProps = {
    children: React.ReactNode
}

type mapStateProps = {
    loginData: {
        email: string,
        password: string
    }
}

type mapDispatchProps ={
    signInThunk: (password: string, email: string) => void 
}

type SignInProps = ownProps & mapStateProps & mapDispatchProps;

const SignIn = ({signInThunk, loginData}: SignInProps) => {

    const onFinish = (loginValues: { email: string, password: string }) => {
        signInThunk(loginValues.password, loginValues.email);
    }

    const onFinishFailed = () => {
        console.log("finish failed");
    }

    console.log("rerender")
    return (
        <Layout>
            <Content style={{ height: "100vh" }}>
                <Row style={{ height: "70vh" }} justify="center" align={"middle"}>
                    <Col span={8}>
                        <Form
                            name="signIn"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                validateTrigger={["onBlur"]}
                                rules={[{ type: "email", required: true, message: "Email is invalid" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "Field is required." }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                        </Form>
                        <Divider />
                        <p>Not have an account? Register <Link to="register">here.</Link> </p>
                        <div>
                            <p>login data:</p>
                            <p>password: {loginData.password}</p>
                            <p>email: {loginData.email}</p>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>


    )
}

const mapStateToProps = (state: StateType) => {
    return {
        loginData: getLoginDataSelector(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        signInThunk: (password: string, email: string) => { dispatch(signInThunk(password, email))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);