import React, { useEffect } from 'react'
import { PageContent, PageHeader, PageTitle, CardWrapper } from "../../components/adminStyledComponents";
import { Divider, Form, Input, Card, Button, Space, Alert, List, Skeleton, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { StateType, PriceItemType, ErrorType, SuccessType, PricesPathType, StemType } from '../../types/interfaces';
import { getPricesThunk, setPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPricesSelector, getPricesErrorsSelector, getPricesSuccessSelector } from '../../selectors/selectors';
import { removePricesErrorAC, removePricesSuccessAC } from '../../redux/actionCreators/actionCreators';
import { Loader } from '../../components/Loader';




type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isLoaded: boolean
    productionAssistance: PriceItemType,
    errors: Array<ErrorType>
    successes: Array<SuccessType>
}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void,
    setPrices: (values: PriceItemType, path: PricesPathType) => void,
    removePricesError: (id: string) => void,
    removePricesSuccess: (id: string) => void
}

type ProductionAssistanceProps = ownProps & mapStateProps & mapDispatchProps;

const ProductionAssistance = ({ productionAssistance, getPrices, setPrices,
    children, errors, successes, removePricesError,
    removePricesSuccess, isLoaded }:ProductionAssistanceProps) => {

    useEffect(() => {
        if (!isLoaded)
            getPrices("/productionAssistance");
    })

    const onCloseAlertErrors = (id: string) => {
        removePricesError(id)
    }

    const onCloseAlertSuccesses = (id: string) => {
        removePricesSuccess(id)
    }


    const onFinish = (values: PriceItemType) => {
        values.features = values.features.toString().split(",");
        setPrices(values, "/productionAssistance");
        console.log(values)

    }

    const onFinishFailed = () => {
        console.log("error")
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
                    <PageTitle>Production assistance</PageTitle>
                </PageHeader>

                <Divider />


                {
                    !isLoaded ? <Loader/> :


                        <CardWrapper>

                            <Card style={{ width: "90%" }}>
                                <Form
                                    layout="vertical"
                                    fields={
                                        [
                                            { name: "EUR", value: productionAssistance.EUR },
                                            { name: "USD", value: productionAssistance.USD },
                                            { name: "features", value: productionAssistance.features },  
                                        ]
                                    }
                                    name={"prices"}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >

                                    <Form.Item
                                        name={"EUR"}
                                        label={"EUR"}>
                                        <InputNumber />
                                    </Form.Item>

                                    <Form.Item
                                        name={"USD"}
                                        label={"USD"}>
                                        <InputNumber />
                                    </Form.Item>

                                    <Form.Item
                                        name={"features"}
                                        label={"Features"}>
                                        <Input type="text" />
                                    </Form.Item>

                                    

                                    <Button htmlType="submit" type="primary">Submit changes</Button>
                                </Form>
                            </Card>
                        </CardWrapper>

                }
            </PageContent>

        </>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        productionAssistance: getPricesSelector(state, "productionAssistance"),
        errors: getPricesErrorsSelector(state),
        successes: getPricesSuccessSelector(state),
        isLoaded: state.PricesReducer.prices.productionAssistance.isLoaded
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPrices: (path: PricesPathType) => dispatch(getPricesThunk(path)),
        setPrices: (prices: PriceItemType, path: PricesPathType) => dispatch(setPricesThunk(prices, path)),
        removePricesError: (id: string) => dispatch(removePricesErrorAC(id)),
        removePricesSuccess: (id: string) => dispatch(removePricesSuccessAC(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductionAssistance);


