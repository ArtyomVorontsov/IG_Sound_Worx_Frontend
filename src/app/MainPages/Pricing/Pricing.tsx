import React, { useState, useEffect } from 'react'
import { Collapse, Descriptions, Select } from 'antd';
const { Option } = Select;
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import { AllPricesType } from '../../types/interfaces';
import { Section } from '../../components/Section';
import { Header2 } from "../Services/Services"
import { SectionHeader } from '../../components/SectionHeader';



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

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <Section paddingTop={"70px"} height={"100vh"} width={"80%"} justify={"flex-start"}>



            {
                isAllPricesLoaded ?

                    <Collapse style={{ width: "100%", marginBottom: "50px", border: "none", backgroundColor: "white" }}>
                        <Panel key={"stereoMastering"} header={"Stereo mastering"} >
                            <p dangerouslySetInnerHTML={{ __html: allPrices.stereoMastering.item.description.replace(/(?:\n)/g, "<br/>") }}></p>
                        </Panel>

                        <Panel key={"quantityOfStems"} header={"Stem mastering"} >
                            <p dangerouslySetInnerHTML={{ __html: allPrices.stemMastering.item.description.replace(/(?:\n)/g, "<br/>") }}></p>
                        </Panel>

                        <Panel key={"Mixing and mastering"} header={"Mixing and mastering"} >
                        <p dangerouslySetInnerHTML={{ __html: allPrices.mixingAndMastering.item.description.replace(/(?:\n)/g, "<br/>") }}></p>
                        </Panel>

                        <Panel key={"productionAssistance"} header={"Production"} >
                        <p dangerouslySetInnerHTML={{ __html: allPrices.productionAssistance.item.description.replace(/(?:\n)/g, "<br/>") }}></p>
                        </Panel>

                        {/* <Panel key={"trackProduction"} header={"Track production"} >
                            <p dangerouslySetInnerHTML={{ __html: allPrices.trackProduction.item.description.replace(/(?:\n)/g, "<br/>") }}></p>
                        </Panel> */}
                    </Collapse>
                    : <Loader />
            }


        </Section>
    )
}
