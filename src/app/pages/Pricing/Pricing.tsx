import React from 'react'
import { Collapse } from 'antd';
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import { AllPricesType } from '../../types/interfaces';



const Section = Styled.section`
    ${props => props.theme.flexStyles("column", "center", "center")}
    height: 100vh;
    width: 80%;
    margin: auto;
`

const CollapseWrapper = Styled.div`
    ${props => props.theme.flexStyles("column", "center", "flex-start")}
    width: 100%;
    height: 80vh;
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


    const PricesInCollapse = []
    if (isAllPricesLoaded) {
        for (const key in allPrices) {
            PricesInCollapse.push(
                <Panel key={allPrices[key].item.name} header={allPrices[key].item.title}>
                    <p>EUR: {allPrices[key].item.EUR}</p>
                    <p>USD: {allPrices[key].item.USD}</p>
                </Panel>)
        }
    }


    return (
        <Section>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: "center", width: "100%" }}>
                <h1 style={{ fontSize: "40px" }}>Prices</h1>
            </div>
            <CollapseWrapper>
                {
                    isAllPricesLoaded ?
                        <Collapse style={{ width: "100%" }}>
                            
                        </Collapse>
                        : <Loader />
                }
            </CollapseWrapper>

        </Section>
    )
}
