import React from 'react'
import styled, { ThemeProvider } from "styled-components";
import { NavLink } from 'react-router-dom';
import { theme } from './theme';


const NavBar = styled.nav`
    width:100%;
    box-sizing: border-box;
    padding: 0 10% 0 10%;
    background-color: black;
    display: flex;
    height: 60px;
    ${props => props.theme.flexStyles("row", "center", "center")}
`

const NavBarUl = styled.ul`
    flex: 7;
    ${props => props.theme.flexStyles("row", "center", "space-between")}
    padding: 0;
    height: 100%;
    margin: 0;
`

export const NavBarLi = styled.li`
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
`

const activeStyle = {
    color: "orange"
}


export const Logo = styled.div`
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

export const NavigationBar = ({ children, logo }: { children: React.ReactNode, logo: any }) => {
    return (
        
            <NavBar>
                <Logo>
                    <img width="150" src={logo} alt="logo" />
                </Logo>
                <NavBarUl>
                    {children}
                </NavBarUl>
            </NavBar>
    )
}
