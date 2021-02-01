import React, { useEffect } from 'react'
import { NavigationBar, NavBarLi, NavigationLink } from '../../components/NavBar'
import { NavLink, Route, Link } from "react-router-dom";
import { PageContent } from '../../components/adminStyledComponents';
import { Order } from '../../MainPages/Order/Order';
import { StemMastering } from '../../MainPages/Order/StemMastring/StemMastering';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../components/theme';
import { Footer } from 'antd/lib/layout/layout';
import { connect } from 'react-redux';
import { StateType, PricesPathType, FieldType, FormValuesType } from '../../types/interfaces';
import { getPricesThunk, PricesReducer } from '../../redux/reducers/PricesReducer';
import { getPromocodesThunk } from '../../redux/reducers/PromocodeReducer';
import { getPromocodesLoadedSelector, getPricesLoadedSelector, getFormValuesSelector } from "../../selectors/selectors"
import { setFormValuesThunk, checkoutThunk } from '../../redux/reducers/FormReducer';
import { StereoMastering } from '../../MainPages/Order/StereoMastering/StereoMastering';
import { MixingAndMastring } from '../../MainPages/Order/MixingAndMastring/MixingAndMastring';
import { ProductionAssistance } from '../../MainPages/Order/ProductionAssistance/ProductionAssistance';
import { TrackProduction } from '../../MainPages/Order/TrackProduction/TrackProduction';



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isPromocodesLoaded: boolean,
    formValues: FormValuesType,
    stemMastering,
    mixingAndMastering,
    stereoMastering,
    productionAssistance,
    trackProduction
}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void
    getPromocodes: () => void
    setFormValues: (field: FieldType) => void,
    checkout: () => void
}

type MainProps = ownProps & mapStateProps & mapDispatchProps;

export const Main = ({ 
    getPrices, 
    getPromocodes, 
    isPromocodesLoaded, 
    setFormValues, 
    formValues,
    stemMastering,
    mixingAndMastering,
    stereoMastering,
    productionAssistance,
    trackProduction,
    checkout }: MainProps) => {

    useEffect(() => {
        if (!stemMastering.isLoaded) getPrices("/stemMastering");
        if (!mixingAndMastering.isLoaded) getPrices("/mixingAndMastering");
        if (!stereoMastering.isLoaded) getPrices("/stereoMastering");
        if (!stereoMastering.isLoaded) getPrices("/productionAssistance");
        if (!stereoMastering.isLoaded) getPrices("/trackProduction");

        if (!isPromocodesLoaded) getPromocodes();
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavigationBar>
                    <NavigationLink to="/pricing">Pricing</NavigationLink>
                    <NavigationLink to="/ourWorx">OurWorx</NavigationLink>
                    <NavigationLink to="/faq">FAQ</NavigationLink>
                    <NavigationLink to="/contacts">Contacts</NavigationLink>
                    <NavigationLink to="/order">Order</NavigationLink>
                </NavigationBar>



                <Route exact path={"/order"}><Order children /></Route>


                <Route exact path={"/order/stereoMastering"}>
                    <StereoMastering
                        formValues={formValues}
                        setFormValues={setFormValues}
                        stereoMastering={stereoMastering}
                        checkout={checkout}
                        children
                    />
                </Route>

                <Route exact path={"/order/stemMastering"}>
                    <StemMastering
                        formValues={formValues}
                        setFormValues={setFormValues}
                        stemMastering={stemMastering}
                        checkout={checkout}
                        children />
                </Route>

                <Route exact path={"/order/mixingAndMastering"}>
                    <MixingAndMastring
                        formValues={formValues}
                        setFormValues={setFormValues}
                        mixingAndMastering={mixingAndMastering}
                        checkout={checkout}
                        children />
                </Route>

                <Route exact path={"/order/productionAssistance"}>
                    <ProductionAssistance
                        formValues={formValues}
                        setFormValues={setFormValues}
                        productionAssistance={productionAssistance}
                        checkout={checkout}
                        children />
                </Route>

                <Route exact path={"/order/trackProduction"}>
                    <TrackProduction
                        formValues={formValues}
                        setFormValues={setFormValues}
                        trackProduction={trackProduction}
                        checkout={checkout}
                        children />
                </Route>
                


             

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
        productionAssistance: state.PricesReducer.prices.productionAssistance,
        trackProduction: state.PricesReducer.prices.trackProduction,
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
