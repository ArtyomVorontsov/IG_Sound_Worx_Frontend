import { Dispatch } from 'react';
import { ActionTypes, SET_USERS, SetUsersType, setUsersAC, setAppErrorAC, SetAppErrorType } from './../actionCreators/actionCreators';
import { UserType } from '../../types/interfaces';
import { API } from '../../API/API';
import { notifyCreator } from '../../../utils/notifyCreator';


type UsersStateType = {
    users: Array<UserType>,
    isLoaded: boolean
}

const defaultState: UsersStateType = {
    users: [],
    isLoaded: false
}


export const UsersReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {

        case SET_USERS:
            return {
                users: [...action.users],
                isLoaded: true
            }


        default:
            return state;
    }
}

export const getUsersThunk = () => async (dispatch: Dispatch<SetUsersType | SetAppErrorType>) => {
    try {
        const users = await API.getUsers();
        dispatch(setUsersAC(users.usersData))
    } catch (err) {
        const error = notifyCreator(err.response.data.error, err.response.status)
        dispatch(setAppErrorAC(error))
        throw error
    }
}
