import React, { useState } from 'react'
import Styled, { ThemeProvider } from "styled-components";
import { NavLink, Link } from 'react-router-dom';
import { theme } from './theme';
//@ts-ignore
import logo from "../components/logo/IGLogo.jpg";
//@ts-ignore
import menu from "../icons/menu.svg";


type NavbarProps = {
    isOpen: boolean
}

const NavBar = Styled.nav`
    width:100%;
    box-sizing: border-box;
    padding: 0 10% 0 10%;
    background-color: black;
    display: flex;
    height: 60px;
    ${props => props.theme.flexStyles("row", "center", "center")}

    @media only screen and (max-width: 600px) {
        transition: all 0.3s ease;
        top: 0;
        z-index: 10;
        height: 100vh;
        overflow: hidden;
        position: relative;

        ${props => props.theme.flexStyles("column", "center", "center")}

        ${
            (props:NavbarProps) => props.isOpen ? `
                transform: translateX(0);
                position: fixed;
               
            ` : `
                transform: translateX(100%);
                position: absolute;
               
            `
        }

        a div{
            flex: 1;
            height: 200px;
        }


        ul{
            ${props => props.theme.flexStyles("column", "center", "space-between")}
            flex: 1;
        } 
    }
`

const NavBarUl = Styled.ul`
    flex: 7;
    ${props => props.theme.flexStyles("row", "center", "space-between")}
    padding: 0;
    height: 100%;
    margin: 0;
`

export const NavBarLi = Styled.li`
    list-style-type: none;
    margin: 0;
    ${props => props.theme.flexStyles("row", "center", "center")}
    color: white;
    width: 100%;
    height: 100%;

    z-index: 10;
    a{
        ${props => props.theme.flexStyles("row", "center", "center")}
        width: 100%;
        height: 100%;
        color: white;
    }
    &:hover {
        a{
            color: orange;
        }
    }

    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }
`

const Burger = Styled.button`
    display: none;
    @media only screen and (max-width: 600px) {
        display: block;
        position: fixed;
        top: 20px;
        left: 85%;
        z-index: 11;
        background: transparent;
        border: none;
    }
`

const activeStyle = {
    color: "orange"
}


export const Logo = Styled.div`
    ${props => props.theme.flexStyles("row", "center", "flex-start")}
    flex: 3;
`

export const NavigationLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
    return (
        <NavBarLi>
            <NavLink activeStyle={activeStyle} to={to}>
                {children}
            </NavLink>
        </NavBarLi>
    )
}

export const NavigationBar = ({ children }: { children: React.ReactNode }) => {

    const [isOpen, setOpen] = useState(false);

    console.log(isOpen)

    return (
        <>
        <Burger style={{width: 50, height: 50}} onClick={() => isOpen ? setOpen(false) : setOpen(true)} id="burger">
            <img width={30} src={menu} alt=""/>
        </Burger>
       
        <NavBar isOpen={isOpen}>
            <Link to="/">
                <Logo onClick={() => setOpen(false)}>
                    <img width="150" src={logo} alt="logo" />
                </Logo>
            </Link>
            <NavBarUl onClick={() => setOpen(false)}>
                {children}
            </NavBarUl>
        </NavBar>
        </>
    )
}
