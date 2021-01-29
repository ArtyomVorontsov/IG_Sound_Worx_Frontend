import React, { useEffect } from 'react'
import { NavigationBar, NavBarLi, NavigationLink } from '../../components/NavBar'
//@ts-ignore
import logo from "../../components/logo/IGLogo.webp";
import { NavLink, Route, Link } from "react-router-dom";
import { PageContent } from '../../components/adminStyledComponents';
import { Order } from '../../MainPages/Order/Order';
import { StemMastering } from '../../MainPages/Order/StemMastering';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../components/theme';
import { Footer } from 'antd/lib/layout/layout';
import { connect } from 'react-redux';
import { StateType, PricesPathType, FieldType, FormValuesType } from '../../types/interfaces';
import { getPricesThunk, PricesReducer } from '../../redux/reducers/PricesReducer';
import { getPromocodesThunk } from '../../redux/reducers/PromocodeReducer';
import { getPromocodesLoadedSelector, getPricesLoadedSelector, getFormValuesSelector } from "../../selectors/selectors"
import { setFormValuesThunk, checkoutThunk } from '../../redux/reducers/FormReducer';



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isPromocodesLoaded: boolean,
    formValues: FormValuesType,
    stemMastering,
    mixingAndMastering,
    stereoMastering
}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void
    getPromocodes: () => void
    setFormValues: (field: FieldType) => void,
    checkout: () => void
}

type MainProps = ownProps & mapStateProps & mapDispatchProps;

export const Main = ({ getPrices, getPromocodes, isPromocodesLoaded, setFormValues, formValues,
    stemMastering,
    mixingAndMastering,
    stereoMastering,
    checkout }: MainProps) => {

    useEffect(() => {
        if (!stemMastering.isLoaded) getPrices("/stemMastering");
        if (!mixingAndMastering.isLoaded) getPrices("/mixingAndMastering");
        if (!stereoMastering.isLoaded) getPrices("/stereoMastering");

        if (!isPromocodesLoaded) getPromocodes();
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
                <Route exact path={"/order/stemMastering"}>
                    <StemMastering
                        formValues={formValues}
                        setFormValues={setFormValues}
                        stemMastering={stemMastering}
                        checkout={checkout}
                        children /></Route>
                <Footer style={{ backgroundColor: "white", height: "100px" }}>

                </Footer>
            </ThemeProvider>
        </>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
        stemMastering: state.PricesReducer.prices.stemMastering,
        mixingAndMastering: state.PricesReducer.prices.mixingAndMastering,
        stereoMastering: state.PricesReducer.prices.stereoMastering,
        isPromocodesLoaded: getPromocodesLoadedSelector(state),
        formValues: getFormValuesSelector(state),
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        getPrices: (path: PricesPathType) => dispatch(getPricesThunk(path)),
        getPromocodes: () => dispatch(getPromocodesThunk()),
        setFormValues: (field: FieldType) => dispatch(setFormValuesThunk(field)),
        checkout: () => dispatch(checkoutThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
