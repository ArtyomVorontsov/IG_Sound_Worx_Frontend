import styled from "styled-components";

export const FormWrapper = styled.div`
    width: 80%;
    min-height: 100vh;
    margin: 40px auto auto auto;
    ${props => props.theme.flexStyles("row", "flex-start", "space-between")}
    flex-wrap: wrap;

    @media only screen and (max-width: 600px) {
        ${props => props.theme.flexStyles("row", "flex-start", "flex-start")}
        flex-wrap: wrap;
    }
`


export const FieldGroup = styled.div`
    width: 100%;
    ${props => props.theme.flexStyles("row", "flex-start", "space-around")}

`