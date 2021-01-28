import React, { Dispatch, useEffect, useState } from 'react';
import { PageContent, PageHeader, PageTitle, CardWrapper } from "../../components/adminStyledComponents";
import { Divider, Form, Input, Card, Button, Space, Alert, List, Skeleton, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { StateType, PriceItemType, ErrorType, SuccessType, PricesPathType, StemType } from '../../types/interfaces';
import { getPricesThunk, setPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPricesSelector, getPricesErrorsSelector, getPricesSuccessSelector } from '../../selectors/selectors';
import { removePricesErrorAC, removePricesSuccessAC } from '../../redux/actionCreators/actionCreators';
import { PlusOutlined } from '@ant-design/icons';
import { StemField } from '../components/StemField';
import { stemFieldFiller } from '../utils/stemFieldFiller';
import { Loader } from '../../components/Loader';




type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isLoaded: boolean
    stemMastering: PriceItemType,
    errors: Array<ErrorType>
    successes: Array<SuccessType>
}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void,
    setPrices: (values: PriceItemType, path: PricesPathType) => void,
    removePricesError: (id: string) => void,
    removePricesSuccess: (id: string) => void
}

type StemMasteringProps = ownProps & mapStateProps & mapDispatchProps;

const MixingAndMastering = ({ stemMastering, getPrices, setPrices,
    children, errors, successes, removePricesError,
    removePricesSuccess, isLoaded }: StemMasteringProps) => {


    const onFinish = (values: PriceItemType) => {

        console.log(values)
        //stems id correction

        values.quantityOfStems = values.quantityOfStems.filter((stem)=>{
            return stem !== undefined
        })

        let stems = values.quantityOfStems.map((stem, index) => {
            stem.id = index;
            return stem;
        })

        values.quantityOfStems = [...stems];
        values.additionalEdit.features = values.additionalEdit.features.toString().split(",");
        values.features = values.features.toString().split(",");
        setPrices(values, "/stemMastering");
        console.log(values)

    }

    const onFinishFailed = () => {
        console.log("error")
    }

    const [quantityOfStemsFields, setQuantityOfStemsFields] = useState([]);

    const addField = () => {
        const newFields = [...quantityOfStemsFields, { EUR: 0, USD: 0, id: quantityOfStemsFields[quantityOfStemsFields.length - 1].id + 1, quantity: { from: 0, to: 0 } }]
        setQuantityOfStemsFields(newFields);
    }


    const removeField = (id: number) => {
        const newFields = quantityOfStemsFields.filter((field) => {
            return id !== field.id
        })

        setQuantityOfStemsFields(newFields);
    }

    useEffect(() => {
        if (!isLoaded)
            getPrices("/stemMastering");

        if (isLoaded) {
            setQuantityOfStemsFields(stemMastering.quantityOfStems);
        }

    }, [stemMastering]);


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
                    <PageTitle>Stem mastering</PageTitle>
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
                                            ...stemFieldFiller(quantityOfStemsFields),
                                            { name: "features", value: stemMastering.features },
                                            { name: ["additionalEdit", "features"], value: stemMastering.additionalEdit.features },
                                            { name: ["additionalEdit", "EUR"], value: stemMastering.additionalEdit.EUR },
                                            { name: ["additionalEdit", "USD"], value: stemMastering.additionalEdit.USD }
                                        ]
                                    }
                                    name={"prices"}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >


                                    <div>
                                        <h3>Quantity of stems</h3>

                                        {quantityOfStemsFields.map((stem, index) => {
                                            return <StemField key={stem.id} remove={removeField} stem={stem} />
                                        })}

                                        <Button
                                            type="dashed"
                                            onClick={() => addField()}
                                            style={{ width: '100%' }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add field
                                        </Button>

                                        <Form.Item
                                            name={"features"}
                                            label={"Features"}>
                                            <Input type="text" />
                                        </Form.Item>

                                        <Divider />

                                        <h3>Additional edit</h3>
                                        <Form.Item
                                            name={["additionalEdit", "EUR"]}
                                            label={"EUR"}>
                                            <InputNumber />
                                        </Form.Item>

                                        <Form.Item
                                            name={["additionalEdit", "USD"]}
                                            label={"USD"}>
                                            <InputNumber />
                                        </Form.Item>

                                        <Form.Item
                                            name={["additionalEdit", "features"]}
                                            label={"Additional Edit Features"}>
                                            <Input type="text" />
                                        </Form.Item>
                                    </div>


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
        stemMastering: getPricesSelector(state, "stemMastering"),
        errors: getPricesErrorsSelector(state),
        successes: getPricesSuccessSelector(state),
        isLoaded: state.PricesReducer.prices.stemMastering.isLoaded
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

export default connect(mapStateToProps, mapDispatchToProps)(MixingAndMastering);
