import React, { useEffect } from 'react'
import { NavigationBar, NavigationLink } from '../../components/NavBar'
import { Route } from "react-router-dom";
import { Order } from '../../MainPages/Order/Order';
import { StemMastering } from '../../MainPages/Order/StemMastring/StemMastering';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../components/theme';
import { Footer } from 'antd/lib/layout/layout';
import { connect } from 'react-redux';
import { StateType, PricesPathType, FieldType, FormValuesType, FAQType, PriceItemType, AllPricesType } from '../../types/interfaces';
import { getPricesThunk } from '../../redux/reducers/PricesReducer';
import { getPromocodesThunk } from '../../redux/reducers/PromocodeReducer';
import { getPromocodesLoadedSelector, getFormValuesSelector, getAllPricesSelector, getFAQSelector, getIsLoadedFAQ } from "../../selectors/selectors"
import { setFormValuesThunk, checkoutThunk } from '../../redux/reducers/FormReducer';
import { StereoMastering } from '../../MainPages/Order/StereoMastering/StereoMastering';
import { MixingAndMastring } from '../../MainPages/Order/MixingAndMastring/MixingAndMastring';
import { ProductionAssistance } from '../../MainPages/Order/ProductionAssistance/ProductionAssistance';
import { TrackProduction } from '../../MainPages/Order/TrackProduction/TrackProduction';
import { clearFormValuesAC } from '../../redux/actionCreators/actionCreators';
import { checkLoginnedThunk } from '../../redux/reducers/LoginReducer';
import { Services } from '../Services/Services';
import { FAQ } from '../../MainPages/FAQ/FAQ';
import { getFAQThunk } from '../../redux/reducers/FAQReducer';
import { Pricing } from '../Pricing/Pricing';



type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    isPromocodesLoaded: boolean,
    formValues: FormValuesType,
    allPrices: AllPricesType,
    isAllPricesLoaded: boolean,
    faq: Array<FAQType>,
    isFaqLoaded: boolean

}

type mapDispatchProps = {
    getPrices: (path: PricesPathType) => void
    getPromocodes: () => void
    setFormValues: (field: FieldType) => void,
    checkout: () => void
    clearFormValues: () => void
    checkLoginned: () => void
    getFaq: () => void
}

type MainProps = ownProps & mapStateProps & mapDispatchProps;

export const Main = ({
    faq,
    getPrices,
    getPromocodes,
    isPromocodesLoaded,
    setFormValues,
    formValues,
    allPrices,
    checkout,
    isAllPricesLoaded,
    clearFormValues,
    checkLoginned,
    isFaqLoaded,
    getFaq }: MainProps) => {

    useEffect(() => {
        if (!isAllPricesLoaded) getPrices("/all")
        if (!isPromocodesLoaded) getPromocodes();
        checkLoginned()
    }, [])

    const RouteProps = {
        formValues,
        setFormValues,
        checkout,
        clearFormValues
    }

    console.log(allPrices)

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavigationBar>
                    <NavigationLink to="/services">Services</NavigationLink>
                    <NavigationLink to="/pricing">Pricing</NavigationLink>
                    <NavigationLink to="/faq">FAQ</NavigationLink>
                    <NavigationLink to="/contacts">Contacts</NavigationLink>
                    {/* <NavigationLink to="/order">Order</NavigationLink> */}
                </NavigationBar>


                <Route exact path={"/services"}><Services /></Route>
                <Route exact path={"/order"}><Order children /></Route>
                <Route exact path={"/faq"}>
                    <FAQ children
                        faq={faq}
                        isFaqLoaded={isFaqLoaded}
                        getFaq={getFaq} />
                </Route>
                <Route exact path={"/pricing"}>
                    <Pricing children
                        allPrices={allPrices}
                        isAllPricesLoaded={isAllPricesLoaded} />
                </Route>


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
        faq: getFAQSelector(state),
        isFaqLoaded: getIsLoadedFAQ(state)
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        getPrices: (path: PricesPathType) => dispatch(getPricesThunk(path)),
        getFaq: () => dispatch(getFAQThunk()),
        getPromocodes: () => dispatch(getPromocodesThunk()),
        setFormValues: (field: FieldType) => dispatch(setFormValuesThunk(field)),
        checkout: () => dispatch(checkoutThunk()),
        clearFormValues: () => dispatch(clearFormValuesAC()),
        checkLoginned: () => dispatch(checkLoginnedThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
