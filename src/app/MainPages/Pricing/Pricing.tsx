import React, { useState } from 'react'
import { Collapse, Descriptions, Select } from 'antd';
const { Option } = Select;
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import { AllPricesType } from '../../types/interfaces';



const Section = Styled.section`
    ${props => props.theme.flexStyles("column", "center", "center")}
    height: auto;
    width: 80%;
    margin: auto;
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
                <h1 style={{fontSize: "40px"}}>Pricing</h1>
            </div>
           
            
                {
                    isAllPricesLoaded ?

                        <Descriptions
                            style={{ width: "100%"}}
                            bordered
                            //column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            layout="vertical"
                        >
                            <Descriptions.Item span={3} label={"Stereo mastering"}>
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

                            </Descriptions.Item>

                            <Descriptions.Item span={3} label={"Stem mastering"}>
                                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
                                    <b>Quantity</b>
                                    <div style={{ display: "flex" }}>

                                        <div>
                                            <p>Choose quantity :</p>
                                            <Select onChange={(e) => setSelectedStemMasteringId(Number(e))} style={{ width: "200px" }} >
                                                {allPrices.stemMastering.item.quantityOfStems.map((stem) => (
                                                    <Option value={stem.id}>{stem.quantity.from} - {stem.quantity.to}</Option>
                                                ))
                                                }
                                            </Select>
                                        </div>
                                        {<div style={{ display: "flex", width: "200px", alignItems: "flex-start", justifyContent: "center", flexDirection: "column", marginLeft: "50px" }}>
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

                            </Descriptions.Item>

                            <Descriptions.Item span={3} label={"Mixing and mastering"}>
                                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
                                    <b>Quantity</b>
                                    <div style={{ display: "flex" }}>

                                        <div>
                                            <p>Choose quantity :</p>
                                            <Select onChange={(e) => setSelectedMixingAndMasteringId(Number(e))} style={{ width: "200px" }} >
                                                {allPrices.mixingAndMastering.item.quantityOfStems.map((stem) => (
                                                    <Option value={stem.id}>{stem.quantity.from} - {stem.quantity.to}</Option>
                                                ))
                                                }
                                            </Select>
                                        </div>
                                        {<div style={{ display: "flex", width: "200px", alignItems: "flex-start", justifyContent: "center", flexDirection: "column", marginLeft: "50px" }}>
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
                            </Descriptions.Item>

                            <Descriptions.Item span={3} label={"Production assistance"}>
                                <div>
                                    <b>Prices</b>
                                    <p>EUR: {allPrices.productionAssistance.item.EUR}</p>
                                    <p>USD: {allPrices.productionAssistance.item.USD}</p>
                                </div>

                                <div>
                                    <b>Features</b>
                                    <p>
                                        {allPrices.productionAssistance.item.features.join(", ")}
                                    </p>
                                </div>
                            </Descriptions.Item>

                            <Descriptions.Item span={3} label={"Stereo mastering"}>
                                <div>
                                    <b>Prices</b>
                                    <p>EUR: {allPrices.trackProduction.item.EUR}</p>
                                    <p>USD: {allPrices.trackProduction.item.USD}</p>
                                </div>

                                <div>
                                    <b>Features</b>
                                    <p>
                                        {allPrices.trackProduction.item.features.join(", ")}
                                    </p>
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                        : <Loader />
                }
          

        </Section>
    )
}
