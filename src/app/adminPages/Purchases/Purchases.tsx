import React, { Dispatch, useEffect, useState } from 'react';
import { Row, Col, Divider, Card, Space, Descriptions, List, Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import { PageContent, PageHeader, PageTitle, CardWrapper, PageHeaderWithTitle } from "../../components/adminStyledComponents";
import { connect } from 'react-redux';
import { StateType, PurchaseItemType } from '../../types/interfaces';
import { getPurchasesThunk } from '../../redux/reducers/PurchasesReducer';
import { Footer } from 'antd/lib/layout/layout';
import { Loader } from '../../components/Loader';
import { getPurchasesSelector, getPurchasesLoadedSelector } from '../../selectors/selectors';
import { PurchasesTable } from './PurchaseTable';






type OwnProps = {
    children: React.ReactNode
}

type MapStateProps = {
    allPurchases: Array<PurchaseItemType>
    isLoaded: boolean
}

type MapDispatchProps = {
    getPurchases: () => void
}

type PurchasesProps = OwnProps & MapStateProps & MapDispatchProps

const Purchases = ({ allPurchases, getPurchases, isLoaded }: PurchasesProps) => {


    useEffect(() => {
        if (!isLoaded) getPurchases()
    }, [])


    return (

        <PageContent>

            <PageHeaderWithTitle>
                Purchases
            </PageHeaderWithTitle>

            <Divider />

            {isLoaded ? null : <Loader />}

            {allPurchases.map((purchase) => {

                return (
                    <Collapse key={purchase.id} style={{ width: "90%", marginBottom: "5px" }}>
                        <CollapsePanel key={"first"} header={`Purchase:${purchase.id}, Full name: ${purchase.purchaseInfo.full_name}`}>
                            <PurchasesTable purchase={purchase}/>
                        </CollapsePanel>
                    </Collapse>)
            })}
            <Footer>

            </Footer>
        </PageContent>

    )
}





const mapStateToProps = (state: StateType) => {
    return {
        allPurchases: getPurchasesSelector(state),
        isLoaded: getPurchasesLoadedSelector(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getPurchases: () => dispatch(getPurchasesThunk())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Purchases);