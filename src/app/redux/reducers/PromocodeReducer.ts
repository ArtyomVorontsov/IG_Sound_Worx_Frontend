import { notifyCreator } from './../../../utils/notifyCreator';
import { getPromocodes } from './../../../../../BetaProjectBackend/functions/src/Routes/Promocode';
import { PriceItemType, PromocodeType, SuccessType, ErrorType } from './../../types/interfaces';
import { ActionTypes, setPricesAC, SetPromocodeType, setPromocodeAC, deletePromocodeAC, setPromocodesAC, SET_PROMOCODES, SET_PROMOCODE, DELETE_PROMOCODE, SET_PROMOCODE_SUCCESS, REMOVE_PROMOCODE_SUCCESS, SET_PROMOCODE_ERROR, REMOVE_PROMOCODE_ERROR, setPromocodeSuccessAC, setPromocodeErrorAC } from './../actionCreators/actionCreators';
import { Dispatch } from 'react';
import { API } from '../../API/API';



type PromocodesState = {
    opened: Array<string>,
    promocodes: Array<PromocodeType>
    successes: Array<SuccessType>,
    errors: Array<ErrorType>,
    isLoaded: boolean
}

const defaultState: PromocodesState = {
    opened: [],
    promocodes: [],
    successes: [],
    errors: [],
    isLoaded: false 
}


export const PromocodesReducer = (state = defaultState, action: ActionTypes): PromocodesState => {
    switch (action.type) {

        case SET_PROMOCODES:
            const openedPromocodes = action.promocodes.map((promocode) => {
                return promocode.id
            })

            return {
                ...state,
                promocodes: [
                    ...action.promocodes
                ],
                opened: [
                    ...openedPromocodes
                ],
                isLoaded: true
            }

        case SET_PROMOCODE:
            return {
                ...state,
                promocodes: [
                    action.promocode,
                    ...state.promocodes
                ],
                opened: [
                    action.promocode.id,
                    ...state.opened
                ]
            }

        case DELETE_PROMOCODE:

            const newPromocodes = state.promocodes.filter((item) => {
                return item.id !== action.id
            })

            const newOpened = state.opened.filter((item) => {
                return item !== action.id
            })

            return {
                ...state,
                promocodes: [
                    ...newPromocodes
                ],

                opened: [
                    ...newOpened
                ]
            }

        case SET_PROMOCODE_SUCCESS:
            return {
                ...state,
                successes: [action.success, ...state.successes]
            }

        case REMOVE_PROMOCODE_SUCCESS:
            const newSuccesses = state.successes.filter((success: SuccessType) => {
                return success.id !== action.id
            })

            return {
                ...state,
                successes: [...newSuccesses]
            }

        case SET_PROMOCODE_ERROR:
            return {
                ...state,
                errors: [action.error, ...state.errors]
            }

        case REMOVE_PROMOCODE_ERROR:
            const newErrors = state.errors.filter((error: ErrorType) => {
                return error.id !== action.id
            })

            return {
                ...state,
                errors: [...newErrors]
            }

        default:
            return state
    }
}

export const getPromocodesThunk = () => async (dispatch: Dispatch<{ type: string }>) => {
    try {
        const response = await API.getPromocodes();
        console.log(response)
        dispatch(setPromocodesAC(response.promocodes))
    } catch (error) {
        throw error;
    }

}


export const setPromocodeThunk = (promocode: PromocodeType) => async (dispatch: Dispatch<{ type: string }>) => {
    try {

        const newPromocode = {
            discount: promocode.discount,
            promocode: promocode.promocode
        }

        const response = await API.setPromocode(newPromocode);
        console.log(promocode)
        dispatch(setPromocodeAC(promocode));

        const success = notifyCreator(response.message, 200);
        dispatch(setPromocodeSuccessAC(success));
    } catch (err) {
        const error = notifyCreator(err.response.data.error, err.response.status);
        dispatch(setPromocodeErrorAC(error))
        throw error;
    }


}

export const deletePromocodeThunk = (id: string) => async (dispatch: Dispatch<{ type: string }>) => {
    try {
        const response = await API.deletePromocode({ id });
        dispatch(deletePromocodeAC(id));
        const success = notifyCreator(response.message, 200);
        dispatch(setPromocodeSuccessAC(success));
        
    } catch (err) {
        const error = notifyCreator(err.response.data.error, err.response.status);
        dispatch(setPromocodeErrorAC(error))
        throw err;
    }
}