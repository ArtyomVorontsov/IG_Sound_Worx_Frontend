import Styled from "styled-components";

export const Section = Styled.section`
    ${props => props.theme.flexStyles("column", "center", "flex-start")}
    height: 100vh;
    width: 80%;
    margin: auto;
`