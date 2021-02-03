import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { StateType, PriceItemType, PurchaseItemType } from '../../types/interfaces'
import { PurchaseStateType } from "../../redux/reducers/PurchasesReducer"

type ownProps = {
    children: React.ReactNode;
}

type mapStateProps = {
    purchases: PurchaseStateType
}

type mapDispatchProps = {

}

type PurchaseFinishProps = ownProps & mapStateProps & mapDispatchProps;


const PurchaseFinish = ({ purchases }: PurchaseFinishProps) => {
    debugger
    console.log("id", purchases)
    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "black" }}>
            {purchases.isLoaded ?
                <>
                    <h1 style={{ color: "white" }}>Thank you for your order. We will keep you updated!</h1>
                    <p style={{ color: "white" }}>Your purchase id: {purchases.purchases[0].id} </p>
                    <p style={{ color: "white" }}>In case of any questions please write us to ivans@igsoundworx.com</p>
                    <a href="/">To main page</a>
                </>
                :
                <Redirect to="/" />}
        </div>


    )
}


const mapStateToProps = (state: StateType) => {
    return {
        purchases: state.PurchasesReducer
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseFinish);