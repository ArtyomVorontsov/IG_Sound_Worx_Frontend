import React from 'react'
import { Link } from "react-router-dom";


type OrderProps = {
    children: React.ReactNode;
}


export const Order = (props: OrderProps) => {
    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Link to="/order/stereoMastering">Stereo mastering</Link>
                <Link to="/order/stemMastering">Stem mastering</Link>
                <Link to="/order/mixingAndMastering">Mixing and mastering</Link>
                <Link to="/order/productionAssistance">Production assistance</Link>
                <Link to="/order/trackProduction">Track production</Link>
            </div>

        </>
    )
}

