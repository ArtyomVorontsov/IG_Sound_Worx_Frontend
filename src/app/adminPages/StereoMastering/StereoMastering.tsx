import React, { useEffect } from 'react'
import { PageContent, PageHeader, PageTitle, CardWrapper } from "../../components/adminStyledComponents";
import { Divider, Form, Input, Card, Button, Space, Alert, List, Skeleton, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { StateType, PriceItemType, ErrorType, SuccessType, PricesPathType, StemType } from '../../types/interfaces';
import { getPricesThunk, setPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPricesSelector, getPricesErrorsSelector, getPricesSuccessSelector } from '../../selectors/selectors';
import { removePricesErrorAC, removePricesSuccessAC } from '../../redux/actionCreators/actionCreators';
import { PlusOutlined } from '@ant-design/icons';
import { Loader } from '../../components/Loader';
import TextArea from 'antd/lib/input/TextArea';





type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isLoaded: boolean
    stereoMastering: PriceItemType,
    errors: Array<ErrorType>
    successes: Array<SuccessType>
}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void,
    setPrices: (values: PriceItemType, path: PricesPathType) => void,
    removePricesError: (id: string) => void,
    removePricesSuccess: (id: string) => void
}

type StereoMasteringProps = ownProps & mapStateProps & mapDispatchProps;

const StereoMastering = ({ stereoMastering, getPrices, setPrices,
    children, errors, successes, removePricesError,
    removePricesSuccess, isLoaded }: StereoMasteringProps) => {

    useEffect(() => {
        if (!isLoaded)
            getPrices("/stereoMastering");
    })

    const onCloseAlertErrors = (id: string) => {
        removePricesError(id)
    }

    const onCloseAlertSuccesses = (id: string) => {
        removePricesSuccess(id)
    }


    const onFinish = (values: PriceItemType) => {
        console.log(values)
        values.additionalEdit.features = values.additionalEdit.features.toString().split(",");
        values.features = values.features.toString().split(",");
        setPrices(values, "/stereoMastering");
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
                    <PageTitle>Stereo mastering</PageTitle>
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
                                            { name: "EUR", value: stereoMastering.EUR },
                                            { name: "USD", value: stereoMastering.USD },
                                            { name: "features", value: stereoMastering.features },
                                            { name: "description", value: stereoMastering.description },
                                            { name: ["additionalEdit","EUR"], value: stereoMastering.additionalEdit.EUR },
                                            { name: ["additionalEdit","USD"], value: stereoMastering.additionalEdit.USD },
                                            { name: ["additionalEdit","features"], value: stereoMastering.additionalEdit.features },
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

                                    <h3>Additional edit</h3>
                                    <Form.Item
                                        name={["additionalEdit", "EUR"]}
                                        label={"EUR"}>
                                        <InputNumber/>
                                    </Form.Item>

                                    <Form.Item
                                        name={["additionalEdit", "USD"]}
                                        label={"USD"}>
                                        <InputNumber/>
                                    </Form.Item>

                                    <Form.Item
                                        name={["additionalEdit","features"]}
                                        label={"Additional Edit Features"}>
                                        <Input type="text" />
                                    </Form.Item>

                                    <Form.Item
                                        name={"description"}
                                        label={"Description"}>
                                        <TextArea />
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
        stereoMastering: getPricesSelector(state, "stereoMastering"),
        errors: getPricesErrorsSelector(state),
        successes: getPricesSuccessSelector(state),
        isLoaded: state.PricesReducer.prices.stereoMastering.isLoaded
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

export default connect(mapStateToProps, mapDispatchToProps)(StereoMastering);


