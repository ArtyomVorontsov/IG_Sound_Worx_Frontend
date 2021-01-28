import { ActionTypes, SET_APP_ERROR} from './../actionCreators/actionCreators';
import { ErrorType } from '../../types/interfaces';


type AppReducerStateType = {
    errors: Array<ErrorType>
}

const defaultState: AppReducerStateType = {
    errors: []
}

export const AppReducer = (state = defaultState, action: ActionTypes) => {
    switch (action.type) {

       case SET_APP_ERROR: 
            return {
                ...state,
                errors: [ action.error ,...state.errors]
            }

        default:
            return state
    }
}