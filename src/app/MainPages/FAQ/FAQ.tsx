import React, { useEffect } from 'react'
import { FAQType } from '../../types/interfaces';
import { Collapse } from 'antd';
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import { Section } from '../../components/Section';



const CollapseWrapper = Styled.div`
    ${props => props.theme.flexStyles("column", "center", "flex-start")}
    width: 100%;
    min-height: 80vh;
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
    useEffect(() => {
        getFaq()
    }, [])

    return (
        <>

            <Section>
                <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', justifyContent: "center", width: "100%", margin: "20px 0 20px 0" }}>
                    <h1 style={{ fontSize: "40px" }}>FAQ</h1>
                </div>

                <CollapseWrapper>

                    {
                        isFaqLoaded ?
                            <Collapse style={{ width: "100%" }}>
                                {faq.map((faq) => {
                                    return (
                                        <Panel key={faq.id} header={faq.title}>
                                            <div dangerouslySetInnerHTML={{ __html: faq.body.replace(/(?:\n)/g, "<br/>") }}></div>
                                        </Panel>

                                    )
                                })}
                            </Collapse> : <Loader />
                    }
                </CollapseWrapper>

            </Section>
        </>
    )
}
