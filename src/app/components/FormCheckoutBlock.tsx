import React, { useState, useEffect } from 'react'
import { Card, Select, Button } from 'antd'
import { FormValuesType, FieldType, CurrencyType } from '../types/interfaces';
import Modal from 'antd/lib/modal/Modal';
import { API } from '../API/API';
import { invoiceGenerator } from "../../utils/invoiceGenerator"

const { Option } = Select;


type FormCheckoutProps = {
    total: number,
    price: number,
    discount: number,
    setFormValues: (field: FieldType) => void
    currency: CurrencyType
    isFinish: boolean
    formValues: FormValuesType
    checkout: () => void
}



const renderPayPalButton = (formValues: FormValuesType, checkout) => {

    const items = {
        "mixingAndMastering": formValues.mixingAndMastering,
        "productionAssistance": formValues.productionAssistance,
        "stemMastering": formValues.stemMastering,
        "stereoMastering": formValues.stereoMastering,
        "trackProduction": formValues.trackProduction,
        "additionalEdit": formValues.additionalEdit
    }

    const newItems = []

    for (const key in items) {

        newItems.push({
            name: key,
            quantity: items[key].count,
            price: items[key].price[formValues.currency]
        })
    }

    setTimeout(() => {
        //@ts-ignore
        window.paypal.Buttons({
            createOrder: (data, actions) => {

                const purchase_units = invoiceGenerator(
                    newItems, formValues.discount, formValues.price,
                    formValues.full_name, formValues.currency,
                    formValues.note_to_payer
                );


                console.log(purchase_units)
                return actions.order.create(
                    purchase_units
                )
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                checkout();
            },
            onError: err => {
                console.error(err);
            },
        }).render("#paypal-button")
    });

}




export const FormCheckoutBlock = ({ formValues, total, price, discount, setFormValues, currency, isFinish, checkout }: FormCheckoutProps) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    //load paypal button with dynamic currency
    if (document.getElementById(`pp${formValues.currency}`) === null) {
        const script = document.createElement("script");
        
        script.src = `https://www.paypal.com/sdk/js?client-id=Abf8fFqf6rsloMXkIbuyvTCGVuGvcsvTHT4AzDRxYo90e8YbNlf1Ph0lj3BL1-Gr9XiRGJB64yKtS_kt&currency=${formValues.currency}`
        script.id = `pp${formValues.currency}`;
        document.body.appendChild(script);
    }
    useEffect(() => {
        if (isModalVisible)
            renderPayPalButton(formValues, checkout);
    }, [isModalVisible])

    const handleClose = () => {
        setIsModalVisible(false);
        const payPalButtonContainer = document.getElementById("paypal-button-container");
        const payPalButton = document.getElementById("paypal-button");
        payPalButtonContainer.removeChild(payPalButton);
    }

    const handleOpen = () => {
        isModalVisible ? setIsModalVisible(false) : setIsModalVisible(true);
        setTimeout(() => {
            const payPalButtonContainer = document.getElementById("paypal-button-container");
            const payPalButton = document.createElement("DIV");
            payPalButton.id = "paypal-button";
            payPalButtonContainer.appendChild(payPalButton);
        }, 0)

    }


    return (
        <>
            <Modal onOk={handleClose} onCancel={handleClose} visible={isModalVisible}>
                <div id="paypal-button-container">
                    <div id="paypal-button"></div>
                </div>
            </Modal>
            <Card style={{ height: "300px", flex: 1, marginLeft: "50px" }}>
                <h2>Total: {total} {`${currency}`}</h2>
                <p>Price: {price}</p>
                <p>Discount: {discount}</p>

                <Select
                    defaultValue={"EUR"}
                    style={{ width: "100px" }}
                    onChange={(e) => setFormValues({
                        key: "currency",
                        value: e.toString()
                    })}>
                    <Option default key={"EUR"} value={"EUR"}>EUR</Option>
                    <Option key={"USD"} value={"USD"}>USD</Option>
                </Select>

                <br />
                <br />

                <Button onClick={handleOpen} htmlType="submit" type="primary">Checkout</Button>
            </Card>
        </>
    )
}
