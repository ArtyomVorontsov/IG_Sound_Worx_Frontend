import React, { useEffect } from 'react'
import { NavigationBar, NavigationLink } from '../../components/NavBar'
import { Route } from "react-router-dom";
import { Order } from '../../MainPages/Order/Order';
import { StemMastering } from '../../MainPages/Order/StemMastring/StemMastering';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../components/theme';
import { Footer } from 'antd/lib/layout/layout';
import { connect } from 'react-redux';
import { StateType, PricesPathType, FieldType, FormValuesType } from '../../types/interfaces';
import { getPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPromocodesThunk } from '../../redux/reducers/PromocodeReducer';
import { getPromocodesLoadedSelector, getFormValuesSelector, getAllPricesSelector } from "../../selectors/selectors"
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
    allPrices,
    isAllPricesLoaded
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
    allPrices,
    checkout,
    isAllPricesLoaded }: MainProps) => {

    useEffect(() => {
        if (!isAllPricesLoaded) getPrices("/all")
        if (!isPromocodesLoaded) getPromocodes();
    }, [])

    const RouteProps = {
        formValues,
        setFormValues,
        checkout,
    }

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
                    <StereoMastering {...RouteProps} children product={allPrices.stereoMastering} />
                </Route>

                <Route exact path={"/order/stemMastering"}>
                    <StemMastering {...RouteProps} children product={allPrices.stemMastering} />
                </Route>

                <Route exact path={"/order/mixingAndMastering"}>
                    <MixingAndMastring {...RouteProps} children product={allPrices.mixingAndMastering} />
                </Route>

                <Route exact path={"/order/productionAssistance"}>
                    <ProductionAssistance {...RouteProps} children product={allPrices.productionAssistance} />
                </Route>

                <Route exact path={"/order/trackProduction"}>
                    <TrackProduction {...RouteProps} children product={allPrices.trackProduction} />
                </Route>

                <Footer style={{ backgroundColor: "white", height: "100px" }}>

                </Footer>
            </ThemeProvider>
        </>
    )
}


const mapStateToProps = (state: StateType) => {
    return {
        allPrices: getAllPricesSelector(state),
        isAllPricesLoaded: state.PricesReducer.isLoaded,
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
