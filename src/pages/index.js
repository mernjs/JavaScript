import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from "styled-components";

const Home = () => {
    const [height, setHeight] = useState(700)
    useEffect(() => {
        setTimeout(() => {
            setHeight(window.screen.availHeight)
        }, 5000)
    }, [])
    return (
        <>
            <ScrollView>
                <Header />
                <Container>
                <iframe id='myIframe' src="https://docs.google.com/forms/d/e/1FAIpQLSdG5gL_TYXkx_ven6P5pRJ1UVA-EuYzGleH7ayQ7llr5jF36w/viewform?embedded=true" width="100%" height={height} frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </Container>
            </ScrollView>
            <Footer/>
        </>
    )
}

export default Home

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    text-align: center;
    padding-top: 50px;
`;