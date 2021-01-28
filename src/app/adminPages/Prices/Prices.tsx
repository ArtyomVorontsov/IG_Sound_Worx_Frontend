import React, { Dispatch, useEffect, useState } from 'react';
import { PageContent, PageHeader, PageTitle, CardWrapper } from "../../components/adminStyledComponents";
import { Divider, Form, Input, Card, Button, Space, Alert, List, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { StateType, PriceItemType, ErrorType, SuccessType, PricesPathType } from '../../types/interfaces';
import { getPricesThunk, setPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPricesSelector, getPricesErrorsSelector, getPricesSuccessSelector } from '../../selectors/selectors';
import { removePricesErrorAC, removePricesSuccessAC } from '../../redux/actionCreators/actionCreators';
import { PricesSkeleton } from './PricesSkeleton';



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    prices: Array<PriceItemType>,
    errors: Array<ErrorType>
    successes: Array<SuccessType>
}

type mapDispatchProps = {
    getPrices: () => void,
    setPrices: (values: PriceItemType) => void,
    removePricesError: (id: string) => void,
    removePricesSuccess: (id: string) => void
}

type PricesProps = ownProps & mapStateProps & mapDispatchProps;

const Prices = ({ prices, getPrices, setPrices, 
    children, errors, successes, removePricesError,
    removePricesSuccess }: PricesProps) => {


    const onFinish = (values: PriceItemType) => {
        setPrices(values);
    }

    const onFinishFailed = () => {
        console.log("hif")
    }

    useEffect(() => {
        if (prices.length === 0) {
            getPrices();
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [prices]);

    const [isLoading, setLoading] = useState(true);

   
    


    const onCloseAlertErrors = (id: string) => {
        removePricesError(id)
    }

    const onCloseAlertSuccesses = (id: string) => {
        removePricesSuccess(id)
    }
    
    return (
        <>

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
                    <PageTitle>Prices</PageTitle>
                </PageHeader>

                <Divider />

                {
                    isLoading ?
                        <CardWrapper>
                            <div style={{ width: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                                <PricesSkeleton/>
                            </div>
                        </CardWrapper>
                        : null
                }

                <CardWrapper>
                    <div style={{ width: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
                        {prices.map((item: PriceItemType) => {
                            return <Card key={item.name} style={{ maxWidth: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "5px" }}>
                                <Form
                                    fields={
                                        [
                                            { name: "EUR", value: item.EUR },
                                            { name: "USD", value: item.USD },
                                            { name: "features", value: item.features },
                                            { name: "title", value: item.title },
                                            { name: "name", value: item.name }
                                        ]
                                    }
                                    name="prices"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >

                                    <div>
                                        <h2>{item.title}</h2>
                                        <Form.Item
                                            name={"EUR"}
                                            label={"EUR"}
                                            rules={[{ required: true, message: "Field is required" }]}>
                                            <Input type="number" />
                                        </Form.Item>

                                        <Form.Item
                                            name={"USD"}
                                            label={"USD"}
                                            rules={[{ required: true, message: "Field is required" }]}>
                                            <Input type="number" />
                                        </Form.Item>

                                        <Form.Item
                                            name={"features"}
                                            label={"Features"}>
                                            <Input type="text" />
                                        </Form.Item>

                                        <Form.Item
                                            name={"title"}
                                            label={"Title"}>
                                            <Input type="text" />
                                        </Form.Item>

                                        <Form.Item
                                            name={"name"}
                                            label={"Name"}>
                                            <Input type="text" />
                                        </Form.Item>
                                    </div>


                                    <Button htmlType="submit" type="primary">Submit changes</Button>
                                </Form>
                            </Card>
                        })}
                    </div>
                </CardWrapper>
            </PageContent>
        </>
    )
}
const mapStateToProps = (state: StateType) => {
    return {
        prices: getPricesSelector(state),
        errors: getPricesErrorsSelector(state),
        successes: getPricesSuccessSelector(state)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPrices: () => dispatch(getPricesThunk()),
        setPrices: (prices: PriceItemType, path: PricesPathType) => dispatch(setPricesThunk(prices, path)),
        removePricesError: (id: string) => dispatch(removePricesErrorAC(id)),
        removePricesSuccess: (id: string) => dispatch(removePricesSuccessAC(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Prices);
