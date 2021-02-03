import { setPurchaseAC, setAppErrorAC } from './../actionCreators/actionCreators';
import { PurchaseItemType } from './../../types/interfaces';
import { ActionTypes, SET_PURCHASES } from "../actionCreators/actionCreators"
import { API } from '../../API/API';
import { notifyCreator } from '../../../utils/notifyCreator';

export type PurchaseStateType = {
    purchases: Array<PurchaseItemType>,
    isLoaded: boolean
}

const defaultState: PurchaseStateType = {
    purchases: [],
    isLoaded: false
}

export const PurchasesReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {

        
        case SET_PURCHASES:
            return {
                purchases: [
                    ...action.purchases
                ],
                isLoaded: true
            }


        default:
            return state;
    }
}


export const getPurchasesThunk = () => async (dispatch: any) => {
    try {
        const response = await API.getPurchases();
        dispatch(setPurchaseAC(response.allPurchases));
    } catch (err) {

        const error = notifyCreator(err.response.data.error, err.response.status)
        dispatch(setAppErrorAC(error))
        throw err;
    }

}
