import React, { useEffect, useState } from 'react'
import { PageHeader, PageContent, PageTitle, CardWrapper, PageFooter } from "../../components/adminStyledComponents"
import { Divider, Card, Form, Input, Button, Space, Tag, Alert } from 'antd'
import Layout from 'antd/lib/layout/layout'
import { connect } from 'react-redux'
import { StateType, PromocodeType, ErrorType, SuccessType } from '../../types/interfaces'
import { setPromocodeThunk, deletePromocodeThunk, getPromocodesThunk } from '../../redux/reducers/PromocodeReducer'
import { getPromocodesSelector, getOpenedPromocodesSelector, getPromocodesErrorsSelector, getPromocodesSuccessesSelector, getPromocodesLoadedSelector } from "../../selectors/selectors"
import { removePromocodeErrorAC, removePromocodeSuccessAC } from '../../redux/actionCreators/actionCreators'
import { Loader } from '../../components/Loader'

type ownProps = {
    children: React.ReactNode
}

type mapStateProps = {
    promocodes: Array<PromocodeType>,
    opened: Array<string>,
    errors: Array<ErrorType>,
    successes: Array<SuccessType>,
    isLoaded: boolean
}

type mapDispatchProps = {
    deletePromocode: (id: string) => void,
    setPromocode: (promocode: PromocodeType) => void,
    getPromocodes: () => void,
    removePromocodeError: (id: string) => void,
    removePromocodeSuccess: (id: string) => void
}


type PromocodesProps = ownProps & mapStateProps & mapDispatchProps;

const Promocodes = ({ promocodes, opened, deletePromocode,
    setPromocode, getPromocodes, errors, successes,
    removePromocodeError, removePromocodeSuccess, isLoaded }: PromocodesProps) => {

    console.log("rerender");



    useEffect(() => {
        if (!isLoaded)
            getPromocodes()
    }, [])

    const onClose = (id: string) => {
        deletePromocode(id);
    }

    const onFinish = ({ promocode, discount }: any) => {
        const newPromocode: PromocodeType = { promocode, discount, id: `${promocode}_${discount}_${Math.floor(Math.random() * 999999)}` };
        setPromocode(newPromocode);
    }

    const onFinishFailed = () => {
        console.log(promocodes)
    }

    const onCloseAlertErrors = (id: string) => {
        removePromocodeError(id)
    }

    const onCloseAlertSuccesses = (id: string) => {
        removePromocodeSuccess(id)
    }


    return (
        <Layout>

            {
                errors.length > 0 ? errors.map((error) => {
                    return <Alert key={error.id} onClose={() => onCloseAlertErrors(error.id)} type="error" closable message={`${error.data} Status: ${error.status}`} />
                }) : null
            }

            {
                successes.length > 0 ?
                    successes.map((success) => {
                        return <Alert key={success.id} onClose={() => onCloseAlertSuccesses(success.id)} type="success" closable message={`${success.data}`} />
                    }) : null
            }


            <PageContent>
                <PageHeader>
                    <PageTitle>Promocodes</PageTitle>
                </PageHeader>
                <Divider />
                <CardWrapper>
                    <Card style={{ width: "100%" }}>
                        <Form
                            name="promocodes"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="promocode"
                                label="Promocode"
                                rules={[{ required: true, message: "Field is required." }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="discount"
                                label="Discount"
                                rules={[{ required: true, message: "Field is required." }]}>
                                <Input />
                            </Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>
                            <Divider />

                            {
                                promocodes.map((item) => {
                                    return opened.includes(item.id) && <Tag key={item.id} onClose={() => onClose(item.id)} closable>
                                        Name: {item.promocode} | Discount: {item.discount}
                                    </Tag>
                                })
                            }
                        </Form>
                        {isLoaded ? null : <Loader />}
                    </Card>

                </CardWrapper>
            </PageContent>
        </Layout>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
        promocodes: getPromocodesSelector(state),
        opened: getOpenedPromocodesSelector(state),
        errors: getPromocodesErrorsSelector(state),
        successes: getPromocodesSuccessesSelector(state),
        isLoaded: getPromocodesLoadedSelector(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setPromocode: (promocode: PromocodeType) => dispatch(setPromocodeThunk(promocode)),
        deletePromocode: (id: string) => dispatch(deletePromocodeThunk(id)),
        getPromocodes: () => dispatch(getPromocodesThunk()),
        removePromocodeError: (id: string) => dispatch(removePromocodeErrorAC(id)),
        removePromocodeSuccess: (id: string) => dispatch(removePromocodeSuccessAC(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Promocodes);