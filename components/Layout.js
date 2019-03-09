import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Particles from 'react-particles-js';
import '../static/index.css';

const particlesOpt = { particles: {number:{value: 150,density:{enable: true, value_area: 800}}}}
const divStyle ={ margin: '0', padding: '0'};

export default props => {
    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <Particles style={divStyle} params={particlesOpt}/>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                <Container>
                    <Head>
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
                    </Head>
                    <Header/>
                    {props.children}
                </Container>
            </div>
            
        </div>
        
    );
};