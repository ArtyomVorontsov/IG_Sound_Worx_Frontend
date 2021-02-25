import React from 'react';
import Styled from "styled-components";
import { Logo } from './NavBar';
//@ts-ignore
import instagram from "../components/logo/ic_instagram.svg";
//@ts-ignore
import facebook from "../components/logo/ic_facebook.svg";


import { SocialButton } from './SocialButton';

const FooterStyled = Styled.footer`
    width: 100%;
    box-sizing: border-box;
    background-color: black;
    height: 150px;
    color: white;

    ${props => props.theme.flexStyles("row", "center", "space-around")}
`

export const Footer = () => {
    return (
        <FooterStyled>
            <span style={{ color: "white" }}>IG Sound Worx 2021</span>
            <div style={{display: "flex", flexDirection: "row", width: "120px", alignItems: "center", justifyContent: "space-around"}}>
                <SocialButton color="red" to="https://www.instagram.com/igsoundworx" icon={instagram} />
                <SocialButton color="blue" to="https://www.facebook.com/igsoundworx" icon={facebook} />
            </div>
        </FooterStyled>
    )
}
