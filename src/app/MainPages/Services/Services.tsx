import React, { useEffect } from 'react'
import Styled from "styled-components";


import { Link } from 'react-router-dom';
import { Section } from '../../components/Section';
import { canvasFunc } from '../../../utils/canvas';
import { AnimatedArrow } from '../../components/animatedArrow';

//@ts-ignore
import armada from "../../components/logo/armada.png"
//@ts-ignore
import AVR from "../../components/logo/AVR.png"
//@ts-ignore
import Axtone from "../../components/logo/Axtone.png"
//@ts-ignore
import Bob_Sinclar from "../../components/logo/Bob_Sinclar.png"
//@ts-ignore
import David_Tort from "../../components/logo/David_Tort.png"
//@ts-ignore
import EDM_logo from "../../components/logo/EDM_logo.png"
//@ts-ignore
import Future_House_Music from "../../components/logo/Future_House_Music.png"
//@ts-ignore
import Hotl from "../../components/logo/Hotl.png"
//@ts-ignore
import Spinnin from "../../components/logo/Spinnin.png"
//@ts-ignore
import logo from "../../components/logo/IGLogo.jpg";

const Header1 = Styled.h1`
    color: white;
    width: 80vw;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    z-index: 1;

    @media only screen and (max-width: 780px) {
        font-size: 35px;
        width: 80vw;
    }
`

type Header2Props = {
    color: string,
    textAlign?: string
}

export const Header2 = Styled.h2`
    color: ${(props: Header2Props) => props.color};
    width: 50vw;
    text-align: ${(props: Header2Props) => props.textAlign ? props.textAlign : "center"};
    font-size: 50px;
    font-weight: bold;

    @media only screen and (max-width: 600px) {
        font-size: 35px;
    }

`

const SubtitleBlack = Styled.h3`
    color: black;
    font-size: 30px;
    text-align: center;

    @media only screen and (max-width: 600px) {
        font-size: 15px;
        width: 80vw;
    }
`

const SubtitleWhite = Styled.h3`
    color: white;
    font-size: 30px;
    text-align: center;

    @media only screen and (max-width: 600px) {
        font-size: 15px;
        width: 80vw;
    }
`


const StyledSpanBlack = Styled.span`
    color: black;
    text-align: center;
    width: 80vw;
    z-index: 1;

    @media only screen and (max-width: 600px) {
        font-size: 15px;
        width: 80vw;
    }
`

const StyledSpanWhite = Styled.span`
    color: white;
    text-align: center;
    width: 80vw;
    z-index: 1;

    @media only screen and (max-width: 600px) {
        font-size: 15px;
        width: 80vw;
    }
`
const StyledLink = Styled.div`
margin: 40px;
z-index: 2;


a{
    color: ${(props) => props.color};
    border: solid 2px ${(props) => props.color};
    border-radius: 5px;
    padding: 10px;
    transition: all 0.2s ;
   
}

a:hover{
    color: white;
    border: solid 2px ${(props) => props.color};
    border-radius: 5px;
    padding: 10px;

    background-color: ${(props) => props.color};
}
   
`

const MainInSection = Styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: auto;
    padding: 20px;
    margin: 20px;
    box-sizing:border-box;
    ${(props: { backgroundColor?: string }) => props.backgroundColor ? `background-color: ${props.backgroundColor};` : null}
`

const LogoWrapper = Styled.div`
    ${props => props.theme.flexStyles("column", "center", "center")}
    width: 15%;
    height: 15%;
    
    overflow: hidden;

    img{
        width: 100%;
    }

    @media only screen and (max-width: 600px) {
        width: 30%;
        height: 30%;
    }
`

const MobileLogo = Styled.div`
    display: none;
    
    @media only screen and (max-width: 600px) {
        display: block;
    }
`


export const Services = () => {

    useEffect(() => {
        canvasFunc("canvas");
    }, [])



    return (
        <>
            <Section justify="space-around" height={"100vh"} color="black">
                <canvas style={{ position: "absolute", zIndex: 0 }} id="canvas" width={window.innerWidth} height={"500"} />
                <MobileLogo>
                    <img width={150} src={logo} alt="logo" />
                </MobileLogo>
                <MainInSection>
                    <Header1>ELECTRONIC DANCE MUSIC <br /> MIXING, MASTERING AND PRODUCTION SERVICE</Header1>
                    <StyledSpanWhite>Let us help you at the final stages of music production by delivering a professional sound.</StyledSpanWhite>
                </MainInSection>
                {/*  <StyledLink color="orange">
                    <Link to="/contacts">Contact us</Link>
                </StyledLink> */}
                <a href="#section1">
                    <AnimatedArrow />
                </a>

            </Section>




            <Section id='section1' color="black">
                <MainInSection backgroundColor={"black"}>
                    <Header2 color="orange">STEM MASTEING</Header2>
                    <SubtitleWhite>Deep Mastetering with Mixing touches</SubtitleWhite>

                    <StyledSpanWhite>
                        Turnaround time: 2 working days <br />
                    Revisions included: 2 <br />
                    Mastering to a reference track <br />
                    </StyledSpanWhite>
                    <StyledSpanWhite>
                        Advanced M/S EQ
                        Compression
                        Multiband compression
                        M/S compression (dynamic)
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness control
                        Finalizing
                    </StyledSpanWhite>

                    <StyledLink color="orange">
                        <Link to="/stemMastering">Order now</Link>
                    </StyledLink>
                </MainInSection>


            </Section>

            <Section backgroundPosition={"left"} backgroundImageSize={"cover"} color="black">
                <MainInSection backgroundColor={"black"}>
                    <Header2 color="#5361e0">STEREO MASTERING</Header2>
                    <SubtitleWhite>Last touch to make it perfect</SubtitleWhite>

                    <StyledSpanWhite>
                        Turnaround time: 2 working days <br />
                    Revisions included: 2 <br />
                    Mastering to a reference track <br />
                    </StyledSpanWhite>
                    <StyledSpanWhite>
                        EQ
                        Compression
                        Multiband compression
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness
                        Finalizing (final control)
                    </StyledSpanWhite>

                    <StyledLink color="#5361e0">
                        <Link to="/stereoMastering">Order now</Link>
                    </StyledLink>

                </MainInSection>


            </Section>

            <Section backgroundPosition={"left"} color="black">

                <MainInSection backgroundColor={"black"}>
                    <Header2 color="orange">MIXING AND MASTERING</Header2>
                    <SubtitleBlack>Full mixing and mastering. From A to Z.</SubtitleBlack>

                    <StyledSpanWhite>
                        Turnaround time: 4 working days <br />
                        Revisions included: UNLIMITED <br />
                        Mixing Mastering to a reference track <br />
                    </StyledSpanWhite>
                    <StyledSpanWhite>
                        Advanced M/S EQ
                        Compression
                        Multiband compression
                        M/S compression (dynamic)
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness control
                        Finalizing
                    </StyledSpanWhite>
                    <StyledLink color="orange">
                        <Link to="/mixingAndMastering">Order now</Link>
                    </StyledLink>
                </MainInSection>

            </Section>


            <Section color="black">
                <MainInSection>
                    <Header2 color="white">Production</Header2>
                    <SubtitleWhite>Deep Mastetering with Mixing touches</SubtitleWhite>

                    <StyledSpanWhite>
                        Turnaround time: 2 working days <br />
                    Revisions included: 2 <br />
                    Mastering to a reference track <br />
                    </StyledSpanWhite>
                    <StyledSpanWhite>
                        Sample pack production
                        Full track production
                        Remixing
                        Production assistance:
                        New arrangement
                        Drums replacement
                        Bassline rework
                        FX rework e.t.c

                </StyledSpanWhite>
                </MainInSection>
                <StyledLink color="orange">
                    <Link to="/productionAssistance">Order now</Link>
                </StyledLink>
            </Section>
            <Section color="white">
                <div style={{ display: "flex", paddingBottom: 100, paddingTop: 100, flexDirection: "row", flexWrap: "wrap", alignItems: "space-around", justifyContent: "space-around", width: "80%", margin: "auto" }}>
                    <div style={{ height: "100%", display: "flex", flexDirection: "row", width: "100%", alignContent: "space-around", justifyContent: "space-around", alignItems: "space-around" }}>
                        <LogoWrapper><img src={armada} alt="armada" /></LogoWrapper>
                        <LogoWrapper><img src={AVR} alt="AVR" /></LogoWrapper>
                        <LogoWrapper><img src={Axtone} alt="axtone" /></LogoWrapper>
                    </div>



                    <div style={{ height: "100%", display: "flex", flexDirection: "row", width: "100%", alignContent: "space-around", justifyContent: "space-around", alignItems: "space-around" }}>
                        <LogoWrapper><img src={Bob_Sinclar} alt="Bob_Sinclar" /></LogoWrapper>
                        <LogoWrapper><img src={David_Tort} alt="David_Tort" /></LogoWrapper>
                        <LogoWrapper><img src={EDM_logo} alt="EDM_logo" /></LogoWrapper>
                    </div>
                    <div style={{ height: "100%", display: "flex", flexDirection: "row", width: "100%", alignContent: "space-around", justifyContent: "space-around", alignItems: "space-around" }}>
                        <LogoWrapper><img src={Future_House_Music} alt="Future_House_Music" /></LogoWrapper>
                        <LogoWrapper><img src={Hotl} alt="Hotl" /></LogoWrapper>
                        <LogoWrapper><img src={Spinnin} alt="Spinnin" /></LogoWrapper>
                    </div>

                </div >
            </Section>
        </>
    )
}
