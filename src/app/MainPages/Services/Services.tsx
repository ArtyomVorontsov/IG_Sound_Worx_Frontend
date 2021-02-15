import React, { useEffect } from 'react'
import Styled from "styled-components";
//@ts-ignore
import mixer from "../../../images/mixer.jpg";
import { Link } from 'react-router-dom';

console.log(mixer)

type SectionProps = {
    backgroundImage?: string
    backgroundPosition?: string
    backgroundImageSize?: string
}

const Section = Styled.section`
    overflow: hidden;
    position: relative;
    ${(props: SectionProps) => props.backgroundImage ? `background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props.backgroundImage});` : null}
    background-position: ${(props: SectionProps) => props.backgroundPosition ? props.backgroundPosition : "center"}; 
    background-size: ${(props: SectionProps) => props.backgroundImageSize ? props.backgroundImageSize : "cover"};
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
    color: ${(props: { color: string }) => props.color};
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
const StyledLink = Styled.div`
margin: 40px;
a{
    color: ${(props) => props.color};
    border: solid 2px ${(props) => props.color};
    border-radius: 5px;
    padding: 10px;
    z-index: 1;
}
   
`

const MainInSection = Styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 60vh;
    ${(props: { backgroundColor?: string }) => props.backgroundColor ? `background-color: ${props.backgroundColor};` : null}
`




export const Services = () => {
    useEffect(() => {
        canvasFunc();

    }, [])

    const canvasFunc = () => {

        const colors = [
            "#5361e0", "#d63838", "#cc31bf", "#ffc226"
        ]

        const randomColor = () => {
            const color = colors[Math.floor(Math.random() * colors.length)]
            return color;
        }


        // const color = ["#5361e0"];

        // setInterval(() => {
        //     color[0] = randomColor();
        // }, 1000)

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
            ctx.strokeStyle = "#5361e0"
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
                <canvas style={{ position: "absolute", zIndex: 0 }} id="canvas" width={window.innerWidth} height={"500"} />
                <MainInSection>
                    <Header1>ELECTRONIC DANCE MUSIC MIXING / MASTERING AND PRODUCTION SERVICE</Header1>
                    <StyledSpanWhite>Let us help you at the final stages of music production by delivering a professional sound.</StyledSpanWhite>
                </MainInSection>
                <StyledLink>
                        <Link to="/order">Order now</Link>
                </StyledLink>
            </Section>




            <Section /* backgroundImage={"../../../images/stemMastering.jpg"} */ color="black">
                <MainInSection backgroundColor={"white"}>
                    <Header2 color="black">STEM MASTEING</Header2>
                    <SubtitleBlack>Deep Mastetering with Mixing touches</SubtitleBlack>

                    <StyledSpanBlack>
                        Turnaround time: 2 working days <br />
                    Revisions included: 2 <br />
                    Mastering to a reference track <br />
                    </StyledSpanBlack>
                    <StyledSpanBlack>
                        Advanced M/S EQ
                        Compression
                        Multiband compression
                        M/S compression (dynamic)
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness control
                        Finalizing
                </StyledSpanBlack>

                    <StyledLink>
                        <Link to="/order/stemMastering">Order now</Link>
                    </StyledLink>
                </MainInSection>


            </Section>

            <Section /* backgroundImage={"../../../images/radio.jpg"} */
                backgroundPosition={"left"} backgroundImageSize={"cover"} color="white">
                <MainInSection backgroundColor={"black"}>
                    <Header2 color="white">STEREO MASTERING</Header2>
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

                    <StyledLink>
                        <Link to="/order/stereoMastering">Order now</Link>
                    </StyledLink>

                </MainInSection>


            </Section>

            <Section backgroundPosition={"left"} /* backgroundImageSize={"300px"} backgroundImage={"../../../images/vinil.jpg"} */ color="black">

                <MainInSection backgroundColor={"white"}>
                    <Header2 color="black">MIXING AND MASTERING</Header2>
                    <SubtitleBlack>Full mixing and mastering. From A to Z.</SubtitleBlack>

                    <StyledSpanBlack>
                        Turnaround time: 4 working days <br />
                    Revisions included: UNLIMITED <br />
                    Mixing Mastering to a reference track <br />
                    </StyledSpanBlack>
                    <StyledSpanBlack>
                        Advanced M/S EQ
                        Compression
                        Multiband compression
                        M/S compression (dynamic)
                        Exiting
                        Stereo imaging
                        Mono compatibility
                        Loudness control
                        Finalizing
                    </StyledSpanBlack>
                    <StyledLink>
                        <Link to="/order/mixingAndMastering">Order now</Link>
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
                <StyledLink>
                        <Link to="/order/productionAssistance">Order now</Link>
                    </StyledLink>
            </Section>
        </>
    )
}
