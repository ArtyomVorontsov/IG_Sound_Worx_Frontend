import { FormReducer } from './reducers/FormReducer';
import { AppReducer } from './reducers/AppReducer';
import { UsersReducer } from './reducers/UsersReducer';
import { FAQReducer } from './reducers/FAQReducer';
import { PromocodesReducer } from './reducers/PromocodeReducer';
import { PricesReducer } from './reducers/PricesReducer';
import { PurchasesReducer } from "./reducers/PurchasesReducer"
import redux, { createStore, combineReducers, applyMiddleware } from "redux";
import { LoginReducer } from "./reducers/LoginReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({ LoginReducer, PricesReducer, 
    PromocodesReducer, PurchasesReducer, FAQReducer, UsersReducer, 
    AppReducer, FormReducer })

const store = createStore(reducers,  composeWithDevTools( applyMiddleware(thunk)), );
console.log(store.getState());



//@ts-ignore
window.store = store;
export default store;
