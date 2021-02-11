import { FAQType } from './../../types/interfaces';
import { ActionTypes, ADD_FAQ, DELETE_FAQ, SET_FAQ, SetFAQType, setFAQAC, AddFAQType, addFAQAC, DeleteFAQType, deleteFAQAC } from './../actionCreators/actionCreators';
import { Dispatch } from 'react';
import { API } from '../../API/API';

type FAQStateType = {
    FAQ: Array<FAQType>
    isLoaded: boolean
}

const defaultState: FAQStateType = {
    FAQ: [],
    isLoaded: false
}

export const FAQReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {

        case SET_FAQ:
            return {
                isLoaded: true, 
                FAQ: [
                    ...action.FAQArray
                ]
            }

        case ADD_FAQ:
            return {
                ...state,
                FAQ: [
                    action.FAQ, ...state.FAQ
                ]
            }

        case DELETE_FAQ:
            const newFAQ = state.FAQ.filter((FAQ) => {
                if (FAQ.id !== action.id) return FAQ
            })
            return {
                ...state,
                FAQ: [
                    ...newFAQ
                ]
            }



        default:
            return state
    }
}

export const getFAQThunk = () => async (dispatch: Dispatch<SetFAQType>) => {
    try {
        const response = await API.getFAQ();
        console.log(response);
        dispatch(setFAQAC(response.faq))
    } catch (error) {
        throw error;
    }
}


export const addFAQThunk = (body: string, title: string) => async (dispatch: Dispatch<AddFAQType>) => {
    try {
        const response = await API.addFAQ(body, title);
        console.log(response);
        dispatch(addFAQAC(response))
    } catch (error) {
        throw error;
    }
}

export const deleteFAQThunk = (id: string) => async (dispatch: Dispatch<DeleteFAQType>) => {
    try {
        const response = await API.deleteFAQ(id);
        console.log(response);
        dispatch(deleteFAQAC(id))
    } catch (error) {
        throw error;
    }
}


