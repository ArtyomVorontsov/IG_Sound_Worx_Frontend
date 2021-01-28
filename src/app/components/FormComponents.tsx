import styled from "styled-components";

export const FormWrapper = styled.div`
    width: 80%;
    margin: 40px auto auto auto;
    ${props => props.theme.flexStyles("row", "flex-start", "space-around")}
`


export const FieldGroup = styled.div`
    width: 100%;
    ${props => props.theme.flexStyles("row", "center", "space-between")}

`