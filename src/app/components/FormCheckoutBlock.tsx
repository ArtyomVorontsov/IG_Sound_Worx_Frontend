import React, { useState, useEffect } from 'react'
import { Card, Select, Button, Descriptions } from 'antd'
import { FormValuesType, FieldType, PricesProductsNamesType } from '../types/interfaces';
import { Table} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { renderPayPalButton } from './PayPalButton';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Styled from "styled-components";



type FormCheckoutProps = {
    setFormValues: (field: FieldType) => void
    close: () => void
    formValues: FormValuesType,
    currentProduct: PricesProductsNamesType,
    checkout: () => void
    isCheckoutBlockOpen: boolean
    history
}


const CheckoutBlock = Styled.div`
    height: 300px; 
    width: 20%;
    border: 0;
    margin: 50px 0 0 50px;

    @media only screen and (max-width: 600px) {
        margin: 0;
        width: 100%;
    }
`


const FormCheckoutBlock: React.FC<RouteComponentProps & FormCheckoutProps> = ({ formValues,
    setFormValues, close, checkout, currentProduct, isCheckoutBlockOpen, history }: FormCheckoutProps) => {

   
    //load paypal button with dynamic currency
    if (document.getElementById(`pp${formValues.currency}`) === null) {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=Abf8fFqf6rsloMXkIbuyvTCGVuGvcsvTHT4AzDRxYo90e8YbNlf1Ph0lj3BL1-Gr9XiRGJB64yKtS_kt&currency=${formValues.currency}`
        script.id = `pp${formValues.currency}`;
        document.body.appendChild(script);
    }

    useEffect(() => {
        if (isCheckoutBlockOpen)
            renderPayPalButton(formValues, checkout, history);
    }, [isCheckoutBlockOpen])

    const handleClose = () => {
        close()
        const payPalButtonContainer = document.getElementById("paypal-button-container");
        const payPalButton = document.getElementById("paypal-button");
        payPalButtonContainer.removeChild(payPalButton);
    }

    const handleOpen = () => {
        setTimeout(() => {
            const payPalButtonContainer = document.getElementById("paypal-button-container");
            const payPalButton = document.createElement("DIV");
            payPalButton.id = "paypal-button";
            payPalButtonContainer.appendChild(payPalButton);
        }, 0)

    }
    
    return (
        <>
            <Modal width={1000} title="Checkout" onOk={handleClose} onCancel={handleClose} visible={isCheckoutBlockOpen}>
                <Descriptions bordered layout="vertical">
                    <Descriptions.Item span={2} label="Full name">
                        {formValues.full_name}
                    </Descriptions.Item>
                    <Descriptions.Item span={2} label="Email">
                        {formValues.email}
                    </Descriptions.Item>
                    <Descriptions.Item span={1} label={`${currentProduct} price (${formValues.currency})`}>
                        {formValues[currentProduct].price[formValues.currency]}
                    </Descriptions.Item>
                    <Descriptions.Item span={1} label={`Additional edit price (${formValues.currency})`}>
                        {formValues.additionalEdit.price[formValues.currency]}
                    </Descriptions.Item>
                    <Descriptions.Item span={1} label={`Total (${formValues.currency})`}>
                        {formValues.total}
                    </Descriptions.Item>
                    <Descriptions.Item span={1} label={`Paypal fee (${formValues.currency})`}>
                        {formValues.paypalFee}
                    </Descriptions.Item>
                    <Descriptions.Item span={10} label="Description">
                        {formValues.description}
                    </Descriptions.Item>
                    <Descriptions.Item span={10} label="Link">
                        <a href={formValues.link}>{formValues.link}</a>
                    </Descriptions.Item>
                </Descriptions>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} id="checkoutButton">
                    <div style={{width: 200}}  id="paypal-button-container">
                        <div id="paypal-button"></div>
                    </div>
                </div>

            </Modal>
            <CheckoutBlock>
                <h2>Total: {formValues.total} {`${formValues.currency}`}</h2>
                <p>Price: {formValues.price}</p>
    <p>Paypal fee: {formValues.paypalFee}</p>
               {/*  <p>Discount: {formValues.discount}</p> */}

                {/* <Select
                    defaultValue={"EUR"}
                    style={{ width: "100px" }}
                    onChange={(e) => setFormValues({
                        key: "currency",
                        value: e.toString()
                    })}>
                    <Option default key={"EUR"} value={"EUR"}>EUR</Option>
                    <Option key={"USD"} value={"USD"}>USD</Option>
                </Select> */}

                {/* <br />
                <br /> */}

                <Button onClick={handleOpen} htmlType="submit" type="primary">Checkout</Button>
            </CheckoutBlock>
        </>
    )
}

export default withRouter(FormCheckoutBlock);