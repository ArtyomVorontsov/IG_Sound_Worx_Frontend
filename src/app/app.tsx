/// <reference path='../.d.ts'/>
import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import store from './redux/store';
import SignIn from './pages/SignIn/SignIn';
import { Provider } from 'react-redux';
import Admin from './pages/Admin/Admin';
import Main from "./pages/Main/Main";

import "./Styles/Styles.css"
import PurchaseFinish from './pages/PurchaseFinish/PurchaseFinish';



export const Context = React.createContext(store);

export const App = () => {

    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path={"/admin"}><Admin /></Route>
                    <Route path={"/signIn"}><SignIn children /></Route>
                    <Route exact path={"/purchaseFinish"}><PurchaseFinish children /></Route>
                    <Route path={"/"}><Main children/></Route>
                </Switch>
            </Router>
        </Provider>
    )
}

// store.subscribe(() => {
//     console.log(store.getState())
//     ReactDOM.render(<App />, container)
// });

const container = document.getElementById("container");
ReactDOM.render(<App />, container);
