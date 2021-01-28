import React, { Dispatch, useEffect, useState } from 'react';
import { PageContent, PageHeader, PageTitle, CardWrapper } from "../../components/adminStyledComponents";
import { Divider, Form, Input, Card, Button, Space, Alert, List, Skeleton, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { StateType, PriceItemType, ErrorType, SuccessType, PricesPathType, StemType } from '../../types/interfaces';
import { getPricesThunk, setPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPricesSelector, getPricesErrorsSelector, getPricesSuccessSelector } from '../../selectors/selectors';
import { removePricesErrorAC, removePricesSuccessAC } from '../../redux/actionCreators/actionCreators';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { MixingAndMasteringField } from './MixingAndMasteringField';




type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isLoaded: boolean
    mixingAndMastering: PriceItemType,
    errors: Array<ErrorType>
    successes: Array<SuccessType>
}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void,
    setPrices: (values: PriceItemType, path: PricesPathType) => void,
    removePricesError: (id: string) => void,
    removePricesSuccess: (id: string) => void
}

type MixingAndMasteringProps = ownProps & mapStateProps & mapDispatchProps;

const MixingAndMastering = ({ mixingAndMastering, getPrices, setPrices,
    children, errors, successes, removePricesError,
    removePricesSuccess, isLoaded }: MixingAndMasteringProps) => {


    const onFinish = (values: PriceItemType) => {
        values.additionalEdit.features = values.additionalEdit.features.toString().split(",");
        values.features = values.features.toString().split(",");
        setPrices(values, "/mixingAndMastering");
        console.log(values)

    }

    const onFinishFailed = () => {
        console.log("hif")
    }

    const [fields, setFieldToState] = useState([]);

    const addField = () => {
        const newFields = [...fields, { EUR: 0, USD: 0, id: fields.length, quantity: { from: 0, to: 0 } }]
        setFieldToState(newFields);
    }

    const removeField = (id: number) => {
        const newFields = fields.filter((field) => {
            return id !== field.id
        })

        setFieldToState(newFields);
    }

    useEffect(() => {
        if (!isLoaded)
            getPrices("/mixingAndMastering");

        if (isLoaded)
            setFieldToState(mixingAndMastering.quantityOfStems);
    }, [mixingAndMastering]);


    const onCloseAlertErrors = (id: string) => {
        removePricesError(id)
    }

    const onCloseAlertSuccesses = (id: string) => {
        removePricesSuccess(id)
    }

    const fieldFiller = () => {
        const filledFields = []
        fields.map((item: StemType) => {
            filledFields.push(
                { name: ["quantityOfStems", item.id, "id"], value: item.id },
                { name: ["quantityOfStems", item.id, "quantity", "from"], value: item.quantity.from },
                { name: ["quantityOfStems", item.id, "quantity", "to"], value: item.quantity.to },
                { name: ["quantityOfStems", item.id, "EUR"], value: item.EUR },
                { name: ["quantityOfStems", item.id, "USD"], value: item.USD }
            )
        })

        return filledFields;
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
                    <PageTitle>Mixing and mastering</PageTitle>
                </PageHeader>

                <Divider />

                {
                    !isLoaded ? <p>loading</p> :


                        <CardWrapper>

                            <Card style={{ width: "90%" }}>
                                <Form
                                    layout="vertical"
                                    fields={
                                        [
                                            ...fieldFiller(),
                                            { name: "features", value: mixingAndMastering.features },
                                            { name: ["additionalEdit", "features"], value: mixingAndMastering.additionalEdit.features },
                                            { name: ["additionalEdit", "EUR"], value: mixingAndMastering.additionalEdit.EUR },
                                            { name: ["additionalEdit", "USD"], value: mixingAndMastering.additionalEdit.USD }
                                        ]
                                    }
                                    name={"prices"}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >


                                    <div>
                                        <h3>Quantity of stems</h3>

                                        {fields.map((stem, index) => {
                                            return <MixingAndMasteringField key={stem.id} remove={removeField} stem={stem} />
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
        mixingAndMastering: getPricesSelector(state).mixingAndMastering.item,
        errors: getPricesErrorsSelector(state),
        successes: getPricesSuccessSelector(state),
        isLoaded: state.PricesReducer.prices.mixingAndMastering.isLoaded
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
