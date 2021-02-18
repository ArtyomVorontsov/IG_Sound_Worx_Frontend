import React, { useEffect } from 'react'
import { FAQType } from '../../types/interfaces';
import { Collapse } from 'antd';
import { Loader } from '../../components/Loader';
const { Panel } = Collapse;
import Styled from "styled-components";
import { Section } from '../../components/Section';
import { SectionHeader } from '../../components/SectionHeader';



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

            <Section height={"100vh"} justify={"flex-start"} width={"80%"}>
                <SectionHeader>
                    FAQ
                </SectionHeader>

                

                    {
                        isFaqLoaded ?
                            <Collapse style={{ width: "100%", border: "none", backgroundColor: "white", marginBottom: "50px" }}>
                                {faq.map((faq) => {
                                    return (
                                        <Panel key={faq.id} header={faq.title}>
                                            <div dangerouslySetInnerHTML={{ __html: faq.body.replace(/(?:\n)/g, "<br/>") }}></div>
                                        </Panel>

                                    )
                                })}
                            </Collapse> : <Loader />
                    }
               

            </Section>
        </>
    )
}
