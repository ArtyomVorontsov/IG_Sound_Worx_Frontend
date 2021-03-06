import React, { useEffect } from 'react'
import { NavigationBar, NavigationLink } from '../../components/NavBar'
import { Route, Redirect } from "react-router-dom";
import { Order } from '../../MainPages/Order/Order';
import { StemMastering } from '../../MainPages/Order/StemMastring/StemMastering';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../components/theme';
import { Footer } from '../../components/Footer';
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
import { Services } from '../../MainPages/Services/Services';
import { FAQ } from '../../MainPages/FAQ/FAQ';
import { getFAQThunk } from '../../redux/reducers/FAQReducer';
import { Pricing } from '../../MainPages/Pricing/Pricing';
import { Contacts } from '../../MainPages/Contacts/Contacts';



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

           
                <>
                <main style={{ height: "auto", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
                    <NavigationBar>
                        <NavigationLink to="/services">Services</NavigationLink>
                        <NavigationLink to="/pricing">Pricing</NavigationLink>
                        <NavigationLink to="/faq">FAQ</NavigationLink>
                        <NavigationLink to="/contacts">Contacts</NavigationLink>
                        {/* <NavigationLink to="/order">Order</NavigationLink> */}
                    </NavigationBar>

                    <Route exact path={"/"}>
                        <Redirect to="/services" />
                    </Route>

                    <Route exact path={"/services"}>
                        <Services />
                    </Route>

                    <Route exact path={"/order"}>
                        <Order children />
                    </Route>

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

                    <Route exact path={"/contacts"}>
                        <Contacts children />
                    </Route>


                    <Route exact path={"/stereoMastering"}>
                        <StereoMastering {...RouteProps} children product={allPrices.stereoMastering} />
                    </Route>

                    <Route exact path={"/stemMastering"}>
                        <StemMastering {...RouteProps} children product={allPrices.stemMastering} />
                    </Route>

                    <Route exact path={"/mixingAndMastering"}>
                        <MixingAndMastring {...RouteProps} children product={allPrices.mixingAndMastering} />
                    </Route>

                    <Route exact path={"/productionAssistance"}>
                        <ProductionAssistance {...RouteProps} children product={allPrices.productionAssistance} />
                    </Route>

                    <Route exact path={"/trackProduction"}>
                        <TrackProduction {...RouteProps} children product={allPrices.trackProduction} />
                    </Route>

                </main>

                <Footer />
                </>
           

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
