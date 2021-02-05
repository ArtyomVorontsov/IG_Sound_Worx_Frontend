import { ActionTypes, signInAC } from './../actionCreators/actionCreators';
import { Dispatch } from 'react';
import { SignInType } from "../actionCreators/actionCreators";
import { API } from '../../API/API';
import decoder from "jwt-decode";


const defaultState = {
    email: "",
    isLoginned: false
}

export const LoginReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {
        case "SIGN_IN":

            return {
                ...state,
                email: action.email,
                isLoginned: true
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
        dispatch(signInAC(email))
    } catch (error) {
        throw error
    }
}

export const checkLoginnedThunk = () => async (dispatch: Dispatch<SignInType>) => {
    try {
        const token = window.localStorage.getItem("token")?.split("Bearer: ")[1];
        if(token){
            const decodedToken = decoder(token);
            console.log(decodedToken)
            //@ts-ignore
            if(decodedToken.exp < Math.round(Date.now()/1000)){
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("email");
                throw "token expired or email is missing"
            }else{
                //@ts-ignore
                dispatch(signInAC(decodedToken.email))
            }
        }
       
    } catch (error) {
        throw error
    }
}

