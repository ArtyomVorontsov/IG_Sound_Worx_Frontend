import { StateType } from './../types/interfaces';


//Promocodes

export const getPromocodesSelector = (state: StateType) => {
   return state.PromocodesReducer.promocodes
}

export const getOpenedPromocodesSelector = (state: StateType) => {
    return state.PromocodesReducer.opened
}

export const getPromocodesErrorsSelector = (state: StateType) => {
    return state.PromocodesReducer.errors
}

export const getPromocodesSuccessesSelector = (state: StateType) => {
    return state.PromocodesReducer.successes
}

export const getPromocodesLoadedSelector = (state: StateType) => {
    return state.PromocodesReducer.isLoaded
}

//Prices 

export const getPricesSelector = (state: StateType, product: "mixingAndMastering" | "stemMastering" | "stereoMastering" | "trackProduction" | "productionAssistance") => {
    return state.PricesReducer.prices[product].item
}

export const getPricesErrorsSelector = (state: StateType) => {
    return state.PricesReducer.errors
}

export const getPricesSuccessSelector = (state: StateType) => {
    return state.PricesReducer.successes
}

//Purchases
export const getPurchasesSelector = (state: StateType) => {
    return state.PurchasesReducer.purchases
}

export const getPurchasesLoadedSelector = (state: StateType) => {
    return state.PurchasesReducer.isLoaded
}

//SignIn
export const getLoginDataSelector = (state: StateType) => {
    return state.LoginReducer
}

//FAQ
export const getFAQSelector = (state: StateType) => {
   return state.FAQReducer.FAQ
}

export const getIsLoadedFAQ = (state: StateType) => {
    return state.FAQReducer.isLoaded
}

//Top buyers
export const getUsersSelector = (state: StateType) => {
    return state.UsersReducer.users
}

export const getUsersLoadedSelector = (state: StateType) => {
    return state.UsersReducer.isLoaded
}
