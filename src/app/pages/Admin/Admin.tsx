import React from 'react'
import { Layout, Menu, Alert } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { Content, Header } from 'antd/lib/layout/layout'
import { Route, NavLink } from 'react-router-dom'
import { withRouter } from "react-router"
import Purchases from '../../adminPages/Purchases/Purchases'
import FAQ from "../../adminPages/FAQ/FAQ"
import Promocodes from '../../adminPages/Promocodes/Promocodes'
import TopBuyers from '../../adminPages/TopBuyers/TopBuyers'
import { connect } from 'react-redux'
import { StateType, ErrorType } from '../../types/interfaces'
import MixingAndMastering from '../../adminPages/MixingAndMastering/MixingAndMastering'
import StemMastering from '../../adminPages/StemMastering/StemMastering'
import StereoMastering from '../../adminPages/StereoMastering/StereoMastering'
import { compose } from 'redux'
import * as H from 'history';
import TrackProduction from '../../adminPages/TrackProduction/TrackProduction'
import ProductionAssistance from '../../adminPages/ProductionAssistance/ProductionAssistance'

type OwnProps = {
    match: any
    location: H.Location
    history: H.History
}

type MapStateProps = {
    errors: Array<ErrorType>
}

type MapDispatchProps = {

}


type AdminProps = OwnProps & MapStateProps & MapDispatchProps;

const Admin = (props: AdminProps) => {

    let currentPage = props.location.pathname.replace("/admin/", "");;
    console.log(currentPage)
    return (
        <>
            {
                props.errors.length > 0 ? props.errors.map((error) => {
                    return <Alert key={error.id} type="error" closable message={`${error.data} Status: ${error.status}`} />
                }) : null
            }
            <Layout style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <Sider>
                    <Menu selectedKeys={[currentPage]} theme="dark" mode="inline">
                        <Menu.Item key={"purchases"} isSelected={true}><NavLink to="/admin/purchases">Purchases</NavLink></Menu.Item>
                        <Menu.Item key={"faq"} ><NavLink to="/admin/faq">FAQ</NavLink></Menu.Item>
                        <Menu.Item key={"promocodes"} ><NavLink to="/admin/promocodes">Promocodes</NavLink></Menu.Item>
                        <Menu.Item key={"topBuyers"} ><NavLink to="/admin/topBuyers">Top buyers</NavLink></Menu.Item>
                        <Menu.Item key={"mixingAndMastering"} ><NavLink to="/admin/mixingAndMastering">Mixing and mastering</NavLink></Menu.Item>
                        <Menu.Item key={"stemMastering"} ><NavLink to="/admin/stemMastering">Stem mastering</NavLink></Menu.Item>
                        <Menu.Item key={"stereoMastering"} ><NavLink to="/admin/stereoMastering">Stereo mastering</NavLink></Menu.Item>
                        <Menu.Item key={"trackProduction"} ><NavLink to="/admin/trackProduction">Track production</NavLink></Menu.Item>
                        <Menu.Item key={"productionAssistance"} ><NavLink to="/admin/productionAssistance">Production assistance</NavLink></Menu.Item>
                        
                    </Menu>
                </Sider>
                <Content>
                    <Route exact path={"/admin/purchases"}> <Purchases children /> </Route>
                    <Route exact path={"/admin/mixingAndMastering"}> <MixingAndMastering children /> </Route>
                    <Route exact path={"/admin/stemMastering"}> <StemMastering children /> </Route>
                    <Route exact path={"/admin/faq"}> <FAQ children />  </Route>
                    <Route exact path={"/admin/promocodes"}> <Promocodes children />  </Route>
                    <Route exact path={"/admin/topBuyers"}> <TopBuyers children />  </Route>
                    <Route exact path={"/admin/stereoMastering"}> <StereoMastering children />  </Route>
                    <Route exact path={"/admin/trackProduction"}> <TrackProduction children />  </Route>
                    <Route exact path={"/admin/productionAssistance"}> <ProductionAssistance children />  </Route>
                    
                </Content>
            </Layout>
        </>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
        errors: state.AppReducer.errors
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {

    }
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter)(Admin)

