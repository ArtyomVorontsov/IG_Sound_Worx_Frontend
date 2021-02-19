import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { StateType, PriceItemType, PurchaseItemType } from '../../types/interfaces'
import { PurchaseStateType } from "../../redux/reducers/PurchasesReducer"
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { Logo } from '../../components/NavBar'
import logo from "../../components/logo/IGLogo.jpg"
import { canvasFunc } from '../../../utils/canvas'

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
    
    useEffect(() => {
        setTimeout(()=>{
            canvasFunc("canvasPurchase");
        }, 100)
        
    }, [])

    console.log("id", purchases)
    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "black", zIndex: 100, position: "absolute" }}>
            {purchases.isLoaded ?
            <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ height: "15vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Logo>
                        <img width={150} src={logo} alt="" />
                    </Logo>
                </div>

                <h1 style={{ color: "white", textAlign: "center" }}>Thank you for your order. We will keep you updated!</h1>
                <p style={{ color: "white" }}>Your purchase id: {purchases.purchases[0].id} </p>
                <p style={{ color: "white" }}>In case of any questions please write us to ivans@igsoundworx.com</p>
                <a href="/">To main page</a>
                <canvas style={{ position: "absolute", top: 0, zIndex: -1 }} id="canvasPurchase" width={window.innerWidth} height={window.innerHeight} />
            </div>
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