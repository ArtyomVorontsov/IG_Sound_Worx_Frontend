import { PriceItemType, PromocodeType, PurchaseItemType, FAQType, UserType, ErrorType, SuccessType, FormValuesType } from './../../types/interfaces';


//Actions

//Purchases
export const SET_PURCHASES = "SET_PURCHASES";

//FAQ
export const SET_FAQ = "SET_FAQ";
export const ADD_FAQ = "ADD_FAQ";
export const DELETE_FAQ = "DELETE_FAQ";

//Users 
export const SET_USERS = "SET_USERS";

//Prices
export const SET_PRICES_ERROR = "SET_PRICES_ERROR";
export const SET_PRICES = "SET_PRICES";
export const SET_PRICES_SUCCESS = "SET_PRICES_SUCCESS";
export const REMOVE_PRICES_ERROR = "REMOVE_PRICES_ERROR";
export const REMOVE_PRICES_SUCCESS = "REMOVE_PRICES_SUCCESS"; 

//Promocodes
export const SET_PROMOCODE = "SET_PROMOCODE";
export const DELETE_PROMOCODE = "DELETE_PROMOCODE";
export const SET_PROMOCODES = "SET_PROMOCODES";
export const SET_PROMOCODE_SUCCESS = "SET_PROMOCODE_SUCCESS";
export const REMOVE_PROMOCODE_SUCCESS = "REMOVE_PROMOCODE_SUCCESS";
export const SET_PROMOCODE_ERROR = "SET_PROMOCODE_ERROR";
export const REMOVE_PROMOCODE_ERROR = "REMOVE_PROMOCODE_ERROR";


//Form
export const SET_FORM_VALUES = "SET_FORM_VALUES";

//App
export const SET_APP_ERROR = "SET_APP_ERROR"

//App reducer
export type SetAppErrorType = {
    type: typeof SET_APP_ERROR,
    error: ErrorType
}

export const setAppErrorAC = (error: ErrorType): SetAppErrorType => {
    return { type: SET_APP_ERROR, error }
}

//Login reducer
export type SignInType = {
    type: "SIGN_IN", email: string, password: string
}

export const signInAC = (email: string, password: string): SignInType => {
    return { type: "SIGN_IN", email, password }
}

//Prices reducer
export type SetPricesType = {
    type: typeof SET_PRICES,
    prices: Array<PriceItemType>
}
export const setPricesAC = (prices: Array<PriceItemType>): SetPricesType => {
    return { type: SET_PRICES, prices }
}

export type SetPricesErrorType = {
    type: typeof SET_PRICES_ERROR,
    error: ErrorType
}

export const setPricesErrorAC = (error: ErrorType): SetPricesErrorType => {
    return { type: SET_PRICES_ERROR, error }
}

export type SetPricesSucessType = {
    type: typeof SET_PRICES_SUCCESS,
    success: SuccessType
}

export const setPricesSucessAC = (success: SuccessType) => {
    return { type: SET_PRICES_SUCCESS, success }
}

export type RemovePricesErrorType = {
    type: typeof REMOVE_PRICES_ERROR,
    id: string
}

export const removePricesErrorAC = (id: string): RemovePricesErrorType => {
    return { type: REMOVE_PRICES_ERROR, id }
}

export type RemovePricesSuccessType = {
    type: typeof REMOVE_PRICES_SUCCESS,
    id: string
}

export const removePricesSuccessAC = (id: string): RemovePricesSuccessType => {
    return { type: REMOVE_PRICES_SUCCESS, id }
}



//Promocodes reducer
export type SetPromocodeType = {
    type: typeof SET_PROMOCODE,
    promocode: PromocodeType
}
export const setPromocodeAC = (promocode: PromocodeType) => {
    return { type: SET_PROMOCODE, promocode }
}

export type DetetePromocodeType = {
    type: typeof DELETE_PROMOCODE,
    id: string
}
export const deletePromocodeAC = (id: string) => {
    return { type: DELETE_PROMOCODE, id }
}

export type SetPromocodesType = {
    type: typeof SET_PROMOCODES,
    promocodes: Array<PromocodeType>
}
export const setPromocodesAC = (promocodes: Array<PromocodeType>) => {
    return { type: SET_PROMOCODES, promocodes }
}

//notify

export type SetPromocodeSuccessType = {
    type: typeof SET_PROMOCODE_SUCCESS,
    success: SuccessType
}
export const setPromocodeSuccessAC = (success: SuccessType): SetPromocodeSuccessType => {
    return { type: SET_PROMOCODE_SUCCESS, success }
}

export type RemovePromocodeSuccessType = {
    type: typeof REMOVE_PROMOCODE_SUCCESS,
    id: string
}
export const removePromocodeSuccessAC = (id: string): RemovePromocodeSuccessType => {
    return { type: REMOVE_PROMOCODE_SUCCESS, id }
}

export type SetPromocodeErrorType = {
    type: typeof SET_PROMOCODE_ERROR,
    error: ErrorType
}
export const setPromocodeErrorAC = (error: ErrorType): SetPromocodeErrorType => {
    return { type: SET_PROMOCODE_ERROR, error }
}

export type RemovePromocodeErrorType = {
    type: typeof REMOVE_PROMOCODE_ERROR,
    id: string
}
export const removePromocodeErrorAC = (id: string): RemovePromocodeErrorType => {
    return { type: REMOVE_PROMOCODE_ERROR, id }
}


//Purchases reducer
export type SetPurchasesType = {
    type: typeof SET_PURCHASES,
    purchases: Array<PurchaseItemType>
}

export const setPurchaseAC = (purchases: Array<PurchaseItemType>): SetPurchasesType => {
    return { type: SET_PURCHASES, purchases }
}


//FAQ

export type SetFAQType = {
    type: typeof SET_FAQ,
    FAQArray: Array<FAQType>
}
export const setFAQAC = (FAQArray: Array<FAQType>): SetFAQType => {
    return { type: SET_FAQ, FAQArray }
}


export type DeleteFAQType = {
    type: typeof DELETE_FAQ,
    id: string
}
export const deleteFAQAC = (id: string): DeleteFAQType => {
    return { type: DELETE_FAQ, id }
}

export type AddFAQType = {
    type: typeof ADD_FAQ,
    FAQ: FAQType
}
export const addFAQAC = (FAQ: FAQType): AddFAQType => {
    return { type: ADD_FAQ, FAQ }
}


//User
export type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export const setUsersAC = (users: Array<UserType>): SetUsersType => {
    return { type: SET_USERS, users };
}


//Form
export type SetFormValuesType = {
    type: typeof SET_FORM_VALUES,
    values: FormValuesType
}

export const setFormValuesAC = (values: FormValuesType): SetFormValuesType => {
    return { type: SET_FORM_VALUES, values }
}

//Action types
export type ActionTypes = SignInType | SetPricesType
    | SetPromocodeType | DetetePromocodeType | SetPromocodesType
    | SetPurchasesType | SetFAQType | AddFAQType | DeleteFAQType | SetUsersType
    | SetPricesErrorType | SetPricesSucessType | RemovePricesErrorType | RemovePricesSuccessType
    | SetPromocodeSuccessType | RemovePromocodeSuccessType | SetPromocodeErrorType
    | RemovePromocodeErrorType | SetAppErrorType | SetFormValuesType

