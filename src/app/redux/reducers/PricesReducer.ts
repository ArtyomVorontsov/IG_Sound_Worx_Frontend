import { idGenerator } from '../../../utils/idGenerator';
import { PriceItemType, ErrorType, SuccessType, PricesPathType, StemMasteringType, StereoMasteringType, StemType, AdditionalEditType } from './../../types/interfaces';
import { ActionTypes, setPricesAC, SetPricesType, setPricesErrorAC, SetPricesErrorType, SET_PRICES, SET_PRICES_ERROR, SET_PRICES_SUCCESS, setPricesSucessAC, REMOVE_PRICES_ERROR, REMOVE_PRICES_SUCCESS } from './../actionCreators/actionCreators';
import { Dispatch } from 'react';
import { API } from '../../API/API';


export type PricesStateType = {
    prices: {
        stereoMastering?: {isLoaded: boolean, item: PriceItemType | null},
        stemMastering?:  {isLoaded: boolean, item: PriceItemType | null},
        mixingAndMastering?:  {isLoaded: boolean, item: PriceItemType | null},
        trackProduction?:  {isLoaded: boolean, item: PriceItemType | null},
        productionAssistance?:  {isLoaded: boolean, item: PriceItemType | null},
    },
    errors: Array<ErrorType>,
    successes: Array<SuccessType>,
    isLoaded: boolean
}

const defaultState: PricesStateType = {
    prices: {
        stereoMastering: {isLoaded: false, item: null},
        stemMastering:  {isLoaded: false, item: null},
        mixingAndMastering:  {isLoaded: false, item: null},
        trackProduction:  {isLoaded: false, item: null},
        productionAssistance:  {isLoaded: false, item: null}
    },
    errors: [],
    successes: [],
    isLoaded: false
}


export const PricesReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {

        case SET_PRICES:
            return {
                ...state,
                prices: {
                    ...state.prices,
                    [action.prices[0].name]: {item: action.prices[0], isLoaded: true}
                },
                isLoaded: true
            }

        case SET_PRICES_ERROR:
            return {
                ...state,
                errors: [action.error, ...state.errors],
                successes: []
            }

        case SET_PRICES_SUCCESS:
            return {
                ...state,
                errors: [],
                successes: [action.success, ...state.successes]
            }

        case REMOVE_PRICES_ERROR:
            const newErrors = state.errors.filter((error) => {
                return error.id !== action.id
            })

            return {
                ...state,
                errors: newErrors
            }

        case REMOVE_PRICES_SUCCESS:
            const newSuccesses = state.successes.filter((success) => {
                return success.id !== action.id
            })

            return {
                ...state,
                successes: newSuccesses
            }


        default:
            return state
    }
}


export const getPricesThunk = (path: PricesPathType) => async (dispatch: Dispatch<SetPricesType | SetPricesErrorType>) => {
    try {
        const prices = await API.getPrices(path);
        
        dispatch(setPricesAC(prices));
    } catch (error) {
        dispatch(setPricesErrorAC(error))
    }
}




export const setPricesThunk = (prices: PriceItemType, path: PricesPathType) => async (dispatch: Dispatch<{ type: string }>) => {

    let newPrices = prices;

    try {

        const response = await API.setPrices(newPrices, path);
        console.log(response);
        const prices: Array<PriceItemType> = [response];
        dispatch(setPricesAC(prices));

        const successMessage: SuccessType = {
            data: "Price updated successfully.",
            status: 200,
            id: idGenerator()
        }

        dispatch(setPricesSucessAC(successMessage))

    } catch (error) {
        console.log(error)

        const errorMessage: ErrorType = {
            data: error.response.data.error,
            status: error.response.status,
            id: idGenerator()
        }

        dispatch(setPricesErrorAC(errorMessage))
    }
}