import Styled from "styled-components";


type SectionProps = {
    backgroundImage?: string
    backgroundPosition?: string
    backgroundImageSize?: string,
    justify?: string
    height?: string
    width?: string
    paddingTop?: string 
}


export const Section = Styled.section`
    ${(props) => props.theme.flexStyles("column", "center", props.justify ?? "center")}
    overflow: hidden;
    position: relative;
    ${(props: SectionProps) => props.backgroundImage ? `background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props.backgroundImage});` : null}
    background-position: ${(props: SectionProps) => props.backgroundPosition ? props.backgroundPosition : "center"}; 
    background-size: ${(props: SectionProps) => props.backgroundImageSize ? props.backgroundImageSize : "cover"};
    background-color: ${(props) => props.color};
    min-height: ${(props: SectionProps) => props.height ? props.height : "80vh"};
    width:  ${(props: SectionProps) => props.width ? props.width : "100%"};
    margin: auto;
    padding-top: ${(props: SectionProps) => props.paddingTop ? props.paddingTop : "0px"};
    

    z-index: 1;
`