import React, { useEffect } from 'react'
import Styled from "styled-components";
//@ts-ignore
import bgImage from "../../../images/bgImage.jpg";

const Section = Styled.section`
    overflow: hidden;
    position: relative;
    background-color: ${(props) => props.color};
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
`

const Header1 = Styled.h1`
    color: white;
    width: 50vw;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    z-index: 1;
`

const Header2 = Styled.h2`
    color: ${(props) => props.color};
    width: 50vw;
    text-align: center;
    font-size: 50px;
    font-weight: bold;

`

const SubtitleBlack = Styled.h3`
    color: black;
    font-size: 30px;
`

const SubtitleWhite = Styled.h3`
    color: white;
    font-size: 30px;
`


const StyledSpanBlack = Styled.span`
    color: black;
    text-align: center;
    width: 80vh;
    z-index: 1;
`

const StyledSpanWhite = Styled.span`
    color: white;
    text-align: center;
    width: 80vh;
    z-index: 1;
`
const StyledLink = Styled.a`
    color: ${(props) => props.color};
    border: solid 2px ${(props) => props.color};
    border-radius: 5px;
    padding: 10px;
    z-index: 1;
`

const MainInSection = Styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 60vh;
`




export const Services = () => {
    useEffect(() => {
        canvasFunc();
        
    }, [])

    const canvasFunc = () => {
        var c = document.getElementById("canvas"); // Grab canvas object
        //@ts-ignore
        var ctx = c.getContext("2d"); // Define canvas context
        //@ts-ignore
        var w = c.width;
        //@ts-ignore
        var h = c.height / 2;
        var f = 1;
        function calcSineY(x) {
            return h - h * Math.sin(x * 2 * Math.PI * (f / w));
        }
        function drawSine(x) {
            ctx.clearRect(0, 0, w, h * 2);

            ctx.beginPath();
            ctx.strokeStyle = "#5361e0";
            for (var i = 0; i < x; i++) {
                if (i / 3 == Math.round(i / 3)) {
                    var y = calcSineY(i);
                    ctx.moveTo(i, h);
                    ctx.lineTo(i, y);
                }
            }
            ctx.stroke();
        }

        var x = 0;

        var interval = setInterval(function () {
            drawSine(x);
            x++;
            if (x > w) {
                x = 0; f++;
            }
        }, 1);
    }

    return (
        <>
            <Section color="black">
                <canvas style={{ position: "absolute", zIndex: 0 }} id="canvas" width={window.innerWidth} height={window.innerHeight} />
                <MainInSection>
                    <Header1>ELECTRONIC DANCE MUSIC MIXING / MASTERING AND PRODUCTION SERVICE</Header1>
                    <StyledSpanWhite>Let us help you at the final stages of music production by delivering a professional sound.</StyledSpanWhite>
                </MainInSection>
                <StyledLink color="white" href="/contact">CONTACT US</StyledLink>
            </Section>


            <Section color="white">
                <MainInSection>
                    <Header2 color="black">STEREO MASTERING</Header2>
                    <SubtitleBlack>Last touch to make it perfect</SubtitleBlack>

                    <StyledSpanBlack>
                        Turnaround time: 2 working days <br />
                    Revisions included: 2 <br />
                    Mastering to a reference track <br />
                    </StyledSpanBlack>
                    <p>
                        EQ
                        Compression
                        Multiband compression
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness
                        Finalizing (final control)
                </p>
                </MainInSection>
                <StyledLink color="black" href="/contact">Order now</StyledLink>

            </Section>

            <Section color="black">
                <MainInSection>
                    <Header2 color="white">STEM MASTEING</Header2>
                    <SubtitleWhite>Deep Mastetering with Mixing touches</SubtitleWhite>

                    <StyledSpanWhite>
                        Turnaround time: 2 working days <br />
                    Revisions included: 2 <br />
                    Mastering to a reference track <br />
                    </StyledSpanWhite>
                    <p style={{ color: "white" }}>
                        Advanced M/S EQ
                        Compression
                        Multiband compression
                        M/S compression (dynamic)
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness control
                        Finalizing
                </p>
                </MainInSection>
                <StyledLink color="white" href="/contact">Order now</StyledLink>

            </Section>

            <Section color="white">

                <MainInSection>
                    <Header2 color="black">MIXING AND MASTERING</Header2>
                    <SubtitleBlack>Full mixing and mastering. From A to Z.</SubtitleBlack>

                    <StyledSpanBlack>
                        Turnaround time: 4 working days <br />
                    Revisions included: UNLIMITED <br />
                    Mixing Mastering to a reference track <br />
                    </StyledSpanBlack>
                    <p style={{ color: "black" }}>
                        Advanced M/S EQ
                        Compression
                        Multiband compression
                        M/S compression (dynamic)
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness control
                        Finalizing
                </p>
                </MainInSection>
                <StyledLink color="black">Order now</StyledLink>
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
                    <p style={{ color: "white" }}>
                        Sample pack production
                        Full track production
                        Remixing
                        Production assistance:
                        New arrangement
                        Drums replacement
                        Bassline rework
                        FX rework e.t.c

                </p>
                </MainInSection>
                <StyledLink color="white">Order now</StyledLink>
            </Section>
        </>
    )
}
