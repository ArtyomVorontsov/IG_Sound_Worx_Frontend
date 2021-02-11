import React, { useEffect } from 'react'
import { FAQType } from '../../types/interfaces';
import { Collapse } from 'antd';
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import Layout, { Header } from 'antd/lib/layout/layout';



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
    faq: Array<FAQType>
    isFaqLoaded: boolean

}

type mapDispatchProps = {
    getFaq: () => void
}

type FAQProps = ownProps & mapStateProps & mapDispatchProps;

export const FAQ = ({ faq, isFaqLoaded, getFaq }: FAQProps) => {
    useEffect(()=>{
        getFaq()
    }, [])

    return (
        <>
        
        <Section>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: "center", width: "100%" }}>
                <h1 style={{fontSize: "40px"}}>FAQ</h1>
            </div>
           
            <CollapseWrapper>
            
            {
                isFaqLoaded ?
                <Collapse style={{width: "100%"}}>
                {faq.map((faq) => {
                    return (
                            <Panel key={faq.id} header={faq.title}>
                                {faq.body}
                            </Panel>
                      
                    )})}
                 </Collapse> : <Loader/>
            }
            </CollapseWrapper>
           
        </Section>
        </>
    )
}
