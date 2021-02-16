import React, { useState } from 'react'
import { Collapse, Descriptions, Select } from 'antd';
const { Option } = Select;
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import { AllPricesType } from '../../types/interfaces';
import { Section } from '../../components/Section';
import { Header2 } from "../Services/Services"



const PricingSection = Styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 40px;
`



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isAllPricesLoaded: boolean
    allPrices: AllPricesType

}

type mapDispatchProps = {

}

type PricingProps = ownProps & mapStateProps & mapDispatchProps;

export const Pricing = ({ allPrices, isAllPricesLoaded }: PricingProps) => {

    const [selectedStemMasteringId, setSelectedStemMasteringId] = useState(0);
    const [selectedMixingAndMasteringId, setSelectedMixingAndMasteringId] = useState(0);

    return (
        <Section>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: "center", width: "100%", margin: "25px 0 25px 0" }}>
                <h1 style={{ fontSize: "40px" }}>Pricing</h1>
            </div>


            {
                isAllPricesLoaded ?

                    <>
                        <PricingSection>
                             <Header2 textAlign="left" color="orange">
                                Stereo mastering.
                            </Header2>
                            <div>
                                <b>Price</b>

                                <p>EUR: {allPrices.stereoMastering.item.EUR}</p>
                                <p>USD: {allPrices.stereoMastering.item.USD}</p>
                            </div>

                            <div>
                                <b>Additional edit</b>
                                <p>EUR: {allPrices.stereoMastering.item.additionalEdit.EUR}</p>
                                <p>USD: {allPrices.stereoMastering.item.additionalEdit.USD}</p>
                            </div>

                            <div>
                                <b>Features</b>
                                <p>
                                    {allPrices.stemMastering.item.features.join(", ")}
                                </p>
                            </div>
                        </PricingSection>

                        <PricingSection >
                            <Header2 textAlign="left" color="orange">
                                Quantity of stems.
                            </Header2>
                            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
                                <b>Quantity</b>
                                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>

                                    <div>
                                        <p>Choose quantity :</p>
                                        <Select onChange={(e) => setSelectedStemMasteringId(Number(e))} style={{ width: "200px" }} >
                                            {allPrices.stemMastering.item.quantityOfStems.map((stem) => (
                                                <Option value={stem.id}>{stem.quantity.from} - {stem.quantity.to}</Option>
                                            ))
                                            }
                                        </Select>
                                    </div>
                                    {<div style={{ display: "flex", width: "200px", alignItems: "flex-start", justifyContent: "center", flexDirection: "column",  }}>
                                        <p>Quantity: {allPrices.stemMastering.item.quantityOfStems[selectedStemMasteringId].quantity.from} - {allPrices.stemMastering.item.quantityOfStems[selectedStemMasteringId].quantity.to}</p>
                                        <p>EUR: {allPrices.stemMastering.item.quantityOfStems[selectedStemMasteringId].EUR}</p>
                                        <p>USD: {allPrices.stemMastering.item.quantityOfStems[selectedStemMasteringId].USD}</p>
                                    </div>}
                                </div>
                                <div>
                                    <b>Additional edit</b>
                                    <p>EUR: {allPrices.stemMastering.item.additionalEdit.EUR}</p>
                                    <p>USD: {allPrices.stemMastering.item.additionalEdit.USD}</p>
                                </div>
                                <div>
                                    <b>Features</b>
                                    <p>
                                        {allPrices.stemMastering.item.features.join(", ")}
                                    </p>
                                </div>
                            </div>

                        </PricingSection>

                        <PricingSection>
                             <Header2 textAlign="left" color="orange">
                                Mixing and mastering.
                            </Header2>
                            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
                                <b>Quantity</b>
                                <div style={{ display: "flex", flexDirection: "column" }}>

                                    <div>
                                        <p>Choose quantity :</p>
                                        <Select onChange={(e) => setSelectedMixingAndMasteringId(Number(e))} style={{ width: "200px" }} >
                                            {allPrices.mixingAndMastering.item.quantityOfStems.map((stem) => (
                                                <Option value={stem.id}>{stem.quantity.from} - {stem.quantity.to}</Option>
                                            ))
                                            }
                                        </Select>
                                    </div>
                                    {<div style={{ display: "flex", flexDirection: "column", width: "200px", alignItems: "flex-start", justifyContent: "center" }}>
                                        <p>Quantity: {allPrices.mixingAndMastering.item.quantityOfStems[selectedMixingAndMasteringId].quantity.from} - {allPrices.mixingAndMastering.item.quantityOfStems[selectedMixingAndMasteringId].quantity.to}</p>
                                        <p>EUR: {allPrices.mixingAndMastering.item.quantityOfStems[selectedMixingAndMasteringId].EUR}</p>
                                        <p>USD: {allPrices.mixingAndMastering.item.quantityOfStems[selectedMixingAndMasteringId].USD}</p>
                                    </div>}
                                </div>
                                <div>
                                    <b>Additional edit</b>
                                    <p>EUR: {allPrices.mixingAndMastering.item.additionalEdit.EUR}</p>
                                    <p>USD: {allPrices.mixingAndMastering.item.additionalEdit.USD}</p>
                                </div>
                                <div>
                                    <b>Features</b>
                                    <p>
                                        {allPrices.mixingAndMastering.item.features.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </PricingSection>

                        <PricingSection >
                             <Header2 textAlign="left" color="orange">
                                Production assistance.
                            </Header2>
                            <div>
                                <b>Prices starting at:</b>
                                <p>EUR: {allPrices.productionAssistance.item.EUR}</p>
                                <p>USD: {allPrices.productionAssistance.item.USD}</p>
                            </div>

                            <div>
                                <b>Features</b>
                                <p>
                                    {allPrices.productionAssistance.item.features.join(", ")}
                                </p>
                            </div>

                            <div>
                                <p><b>For more info:</b> igsw@mail.com</p>
                            </div>
                        </PricingSection>

                        <PricingSection >
                             <Header2 textAlign="left" color="orange">
                                Track production.
                            </Header2>
                            <div>
                                <b>Prices starting at:</b>
                                <p>EUR: {allPrices.trackProduction.item.EUR}</p>
                                <p>USD: {allPrices.trackProduction.item.USD}</p>
                            </div>

                            <div>
                                <b>Features</b>
                                <p>
                                    {allPrices.trackProduction.item.features.join(", ")}
                                </p>
                            </div>

                            <div>
                                <p><b>For more info:</b> igsw@mail.com</p>
                            </div>
                        </PricingSection>
                    </>
                    : <Loader />
            }


        </Section>
    )
}
