import React from 'react'
import { Layout, Menu, Alert } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { Content, Header } from 'antd/lib/layout/layout'
import { Route, NavLink } from 'react-router-dom'
import Purchases from '../../adminPages/Purchases/Purchases'
//import Prices from '../../adminPages/Prices/Prices'
import FAQ from "../../adminPages/FAQ/FAQ"
import Promocodes from '../../adminPages/Promocodes/Promocodes'
import TopBuyers from '../../adminPages/TopBuyers/TopBuyers'
import { connect } from 'react-redux'
import { StateType, ErrorType } from '../../types/interfaces'
import MixingAndMastering from '../../adminPages/MixingAndMastering/MixingAndMastering'
import StemMastering from '../../adminPages/StemMastering/StemMastering'
import StereoMastering from '../../adminPages/StereoMastering/StereoMastering'


type ownProps = {

}

type mapStateProps = {
    errors: Array<ErrorType>
}

type mapDispatchProps = {

}


type AdminProps = ownProps & mapStateProps & mapDispatchProps;

const Admin = ({ errors }: AdminProps) => {



    return (
        <>
            {
                errors.length > 0 ? errors.map((error) => {
                    return <Alert key={error.id} type="error" closable message={`${error.data} Status: ${error.status}`} />
                }) : null
            }
            <Layout style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
                <Sider>
                    <Menu theme="dark" mode="inline">
                       {/*  <Menu.Item><NavLink to="/admin/prices">Prices</NavLink></Menu.Item> */}
                        <Menu.Item><NavLink to="/admin/purchases">Purchases</NavLink></Menu.Item>
                        <Menu.Item><NavLink to="/admin/faq">FAQ</NavLink></Menu.Item>
                        <Menu.Item><NavLink to="/admin/promocodes">Promocodes</NavLink></Menu.Item>
                        <Menu.Item><NavLink to="/admin/topBuyers">Top buyers</NavLink></Menu.Item>
                        <Menu.Item><NavLink to="/admin/mixingAndMastering">Mixing and mastering</NavLink></Menu.Item>
                        <Menu.Item><NavLink to="/admin/stemMastering">Stem mastering</NavLink></Menu.Item>
                        <Menu.Item><NavLink to="/admin/stereoMastering">Stereo mastering</NavLink></Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Route exact path={"/admin/purchases"}> <Purchases children /> </Route>
                    {/* <Route exact path={"/admin/prices"}> <Prices children /> </Route> */}
                    <Route exact path={"/admin/mixingAndMastering"}> <MixingAndMastering children /> </Route>
                    <Route exact path={"/admin/stemMastering"}> <StemMastering children /> </Route>
                    <Route exact path={"/admin/faq"}> <FAQ children />  </Route>
                    <Route exact path={"/admin/promocodes"}> <Promocodes children />  </Route>
                    <Route exact path={"/admin/topBuyers"}> <TopBuyers children />  </Route>
                    <Route exact path={"/admin/stereoMastering"}> <StereoMastering children />  </Route>
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


export default connect(mapStateToProps, mapDispatchToProps)(Admin);