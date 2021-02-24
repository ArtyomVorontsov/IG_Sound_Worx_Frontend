import React from 'react'

import Styled from "styled-components";
//@ts-ignore
import arrow from "../icons/arrow.svg";

const StyledImg = Styled.img`
    transform: rotate(90deg);
    @keyframes jump {
        from {
            transform: translateY(100px);
        }
        to {
            transform: translateY(0px);
        }
    }

    width: 100px;
    height: 100px;

    animation: jump 2s linear 0s infinite alternate;
`

export const AnimatedArrow = () => {
    return (
        <div style={{transform: "rotate(90deg)", backgroundColor: "red"}}>
            <StyledImg src={arrow} />
        </div>

    )
}