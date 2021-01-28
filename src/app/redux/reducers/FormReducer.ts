import { FormValuesType, PriceItemType, CurrencyType, PromocodeType } from './../../types/interfaces';
import { Dispatch } from 'react';
import { ActionTypes, SET_FORM_VALUES, SetFormValuesType, setFormValuesAC } from './../actionCreators/actionCreators';
import { StateType } from '../../types/interfaces';



const defaultState: FormValuesType = {
    description: "",
    email: "",
    full_name: "",
    promocode: "",
    discount: 0,
    price: 0,
    total: 0,
    currency: "EUR",
    note_to_payer: "",
    stereoMastering: { price: 0, count: 0 },
    stemMastering: { price: 0, count: 0 },
    additionalMix: { price: 0, count: 0 },
    additionalStem: { price: 0, count: 0 },
    remixing: { price: 0, count: false },
    productionAssistance: { price: 0, count: false },
    trackProduction: { price: 0, count: false },
}


export const FormReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {

        case SET_FORM_VALUES:
            return { ...action.values }

        default:
            return state;
    }
}

const countTotal = (formValues: FormValuesType, prices: Array<PriceItemType>, currency: CurrencyType) => {

    let newPrice = 0
    prices.forEach((price) => {
        formValues[price.name].price = price[currency] * formValues[price.name].count;
        newPrice += formValues[price.name].price;
    })

    formValues.price = newPrice

    formValues.discount = formValues.discount * (formValues.price /100)
    formValues.total = formValues.price - formValues.discount
    return formValues;
}


export const setFormContactValuesThunk = (field: {id: string, value: string}) => (dispatch: Dispatch<SetFormValuesType>, getState: () => StateType) => {
    const name = field.id.split("order_")[1];
    let value = field.value

    const state: StateType = getState();
    const formValues = { ...state.FormReducer }
    const newFormValues: FormValuesType = Object.assign(formValues, { [name]: value });

    const promocodes = state.PromocodesReducer.promocodes;
    promocodes.forEach((promocode: PromocodeType) => {
        if (promocode.promocode === newFormValues.promocode)
            newFormValues.discount = promocode.discount
    })

    dispatch(setFormValuesAC(newFormValues));
}

export const setFormValuesThunk = (field: { value: string | number | boolean, id: string }) => (dispatch: Dispatch<SetFormValuesType>, getState: () => StateType) => {

    const name = field.id.split("order_")[1];
    let value = { price: 0, count: field.value }
    const state: StateType = getState();

    const prices = [...state.PricesReducer.prices]
    const formValues = { ...state.FormReducer }
    //@ts-ignore
    const newFormValues: FormValuesType = Object.assign(formValues, { [name]: value });


    console.log(newFormValues)
    dispatch(setFormValuesAC(countTotal(newFormValues, prices, "EUR")))
}