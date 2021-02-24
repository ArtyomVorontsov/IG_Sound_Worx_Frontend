import React from 'react'

import Styled from "styled-components";
//@ts-ignore
import arrow from "../icons/arrow.svg";


const StyledImg = Styled.img`
    
    @keyframes jump {
        from {
            transform: translateX(10px);
        }
        to {
            transform: translateX(0px);
        }
    }

    width: 30px;
    height: 30px;

    animation: jump 0.5s ease-in-out 0s infinite alternate;
`

export const AnimatedArrow = () => {
    return (
        <div style={{transform: "rotate(90deg)"}}>
            <StyledImg src={arrow} />
        </div>
    )
}
