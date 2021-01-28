import styled from "styled-components";
import React from 'react'

export const PageTitle = styled.h1`
    font-family: 'Roboto', sans-serif;
    font-size: 50px;
    font-weight: bold;
    margin: 0px;
`

export const PageHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 90%;
    margin-top:20px;
    height: auto;
`

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    
`

export const PageContent = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    overflow: scroll;
`

export const PageFooter = styled.footer`
    display: flex;
    width: 100%;
    min-height: 20vh;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`


export const PageHeaderWithTitle = ({children}: {children: React.ReactNode}) => {
    return (
        <PageHeader>
            <PageTitle>{children}</PageTitle>
        </PageHeader>
    )
}
