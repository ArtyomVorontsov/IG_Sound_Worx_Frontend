import React from 'react'
import Styled from "styled-components";

const SocialButtonStyled = Styled.button`
    ${props => props.theme.flexStyles("row", "center", "center")}
    margin: 0;
    padding: 0;

    border: solid 2px gray;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: black;

    outline: none;

    
    img{
        opacity: 0.6;
        z-index: 10;
        user-select: none;
    }

    &:hover{ 
        box-shadow: 10px 5px 10px #162740;
        background-color: ${props => props.theme[props.color]};
        border: solid 2px ${props =>props.theme[props.color]};
        img{
            filter: invert(0.4) brightness(500%);
            opacity: 1;
        }
    }

    &:active{
       background-color: ${props => props.theme[props.color]};
       filter: brightness(85%);
    }
   
   
`

export const SocialButton = ({icon, color}) => {
    return (
        <SocialButtonStyled color={color}>
            <img draggable={false} src={icon} alt=""/>
        </SocialButtonStyled>
    )
}
