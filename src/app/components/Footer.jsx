import React from 'react';
import Styled from "styled-components";
import { Logo } from './NavBar';
//@ts-ignore
import logo from "../components/logo/IGLogo.jpg";

const FooterStyled = Styled.footer`
    width: 100%;
    padding: 10%;
    box-sizing: border-box;
    height: 30vh;
    background-color: black;

    color: white;

    ${props => props.theme.flexStyles("column", "center", "space-around")}
`

export const Footer = () => {
    return (
        <FooterStyled>
            <Logo>
                <img width="100" src={logo} alt="logo" />
            </Logo>
        </FooterStyled>
    )
}
