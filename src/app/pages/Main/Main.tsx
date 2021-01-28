import React, { useEffect } from 'react'
import { NavigationBar, NavBarLi, NavigationLink } from '../../components/NavBar'
//@ts-ignore
import logo from "../../components/logo/IGLogo.webp";
import { NavLink, Route, Link } from "react-router-dom";
import { PageContent } from '../../components/adminStyledComponents';
import Order from '../../MainPages/Order/Order';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../components/theme';
import { Footer } from 'antd/lib/layout/layout';
import { connect } from 'react-redux';
import { StateType } from '../../types/interfaces';
import { getPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPromocodesThunk } from '../../redux/reducers/PromocodeReducer';



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isPricesLoaded: boolean,
    isPromocodesLoaded: boolean
}

type mapDispatchProps = {
    getPrices: () => void
    getPromocodes: () => void
}

type MainProps = ownProps & mapStateProps & mapDispatchProps;

export const Main = ({isPricesLoaded, getPrices, getPromocodes, isPromocodesLoaded}: MainProps) => {

    useEffect(()=>{
        if(!isPricesLoaded) getPrices();
        if(!isPromocodesLoaded) getPromocodes();
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavigationBar logo={logo}>
                    <NavigationLink to="/pricing">Pricing</NavigationLink>
                    <NavigationLink to="/ourWorx">OurWorx</NavigationLink>
                    <NavigationLink to="/faq">FAQ</NavigationLink>
                    <NavigationLink to="/contacts">Contacts</NavigationLink>
                    <NavigationLink to="/order">Order</NavigationLink>
                </NavigationBar>



                <Route exact path={"/order"}><Order children /></Route>
                <Footer style={{backgroundColor: "white", height: "100px"}}>

                </Footer>
            </ThemeProvider>
        </>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
      isPricesLoaded: state.PricesReducer.isLoaded,
      isPromocodesLoaded: state.PromocodesReducer.isLoaded
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPrices: () => dispatch(getPricesThunk()),
        getPromocodes: () => dispatch(getPromocodesThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
