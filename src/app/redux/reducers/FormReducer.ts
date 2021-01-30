import { PricesStateType } from './PricesReducer';
import { FormValuesType, PriceItemType, CurrencyType, PromocodeType, FieldType } from './../../types/interfaces';
import { Dispatch } from 'react';
import { ActionTypes, SET_FORM_VALUES, SetFormValuesType, setFormValuesAC } from './../actionCreators/actionCreators';
import { StateType } from '../../types/interfaces';
import { API } from '../../API/API';



const defaultState: FormValuesType = {
    description: "",
    link: "",
    email: "",
    full_name: "",
    promocode: "",
    discount: 0,
    price: 0,
    total: 0,
    currency: "EUR",
    note_to_payer: "",
    stereoMastering: { price: {EUR: 0, USD: 0}, count: 0 },
    stemMastering: { price: {EUR: 0, USD: 0}, count: 0 },
    mixingAndMastering: { price: {EUR: 0, USD: 0}, count: 0 },
    additionalEdit: { price: {EUR: 0, USD: 0}, count: 0 },
    productionAssistance: { price: {EUR: 0, USD: 0}, count: false },
    trackProduction: { price: {EUR: 0, USD: 0}, count: false },
}


export const FormReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {
        case SET_FORM_VALUES:

            return {
                ...state,
                [action.values.key]: action.values.value
            }

        default:
            return state;
    }
}

const countTotal = (formValues: FormValuesType, prices: PricesStateType, currency: CurrencyType) => {

    const price = { key: "price", value: 0 };
    price.value = formValues.stereoMastering.price[currency] +
        formValues.mixingAndMastering.price[currency] + 
        formValues.stemMastering.price[currency] +
        formValues.additionalEdit.price[currency] +
        formValues.productionAssistance.price[currency] +
        formValues.trackProduction.price[currency]

    const total = { key: "total", value: price.value }

    return { total, price }

}


export const setFormValuesThunk = (field: FieldType) => (dispatch: Dispatch<SetFormValuesType>, getState: () => StateType) => {

    field.key = field.key.replace("order_", "");
    dispatch(setFormValuesAC(field))

    const { FormReducer, PricesReducer } = getState()
    const { total, price } = countTotal(FormReducer, PricesReducer, FormReducer.currency)
    dispatch(setFormValuesAC(total))
    dispatch(setFormValuesAC(price))
}

export const checkoutThunk = () => async (dispatch: any, getState: () => StateType) => {
    const purchase = getState().FormReducer;
    try {
        const res = await API.addPurchase(purchase);
        console.log(res);
    } catch (error) {
        throw error;
    }
    
   
}