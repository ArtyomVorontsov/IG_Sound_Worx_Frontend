import { ActionTypes } from './../actionCreators/actionCreators';
import { Dispatch } from 'react';
import { SignInType } from "../actionCreators/actionCreators";
import { API } from '../../API/API';


const defaultState = {
    password: "",
    email: ""
}

export const LoginReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {
        case "SIGN_IN":

            return {
                ...state,
                password: action.password,
                email: action.email
            }

        default:
            return state
    }
}

export const signInThunk = (password: string, email: string) => async (dispatch: Dispatch<SignInType>) => {

    try {
        const res = await API.signIn(password, email);
        console.log(res);
        const token = res.token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    } catch (error) {
        throw error
    }

}