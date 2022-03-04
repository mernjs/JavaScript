import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charset="utf-8" />
                    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="description" content="Please choose who will become CM in UP. Created By Vijay Pratap Singh."/>
                    <title>General Polling</title>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://general-polling.herokuapp.com/" />
                    <meta property="og:title" content="General Polling" />
                    <meta property="og:description" content="Please choose who will become CM in UP. Created By Vijay Pratap Singh." />
                    <meta property="og:image" content="https://res.cloudinary.com/dyzcjrfca/image/upload/v1646415517/Election-Vote-2-icon_n4wj37.png" />
                    <meta property="og:image:type" content="image/png" />

                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://general-polling.herokuapp.com/"/>
                    <meta property="twitter:title" content="General Polling"/>
                    <meta property="twitter:description" content="Please choose who will become CM in UP. Created By Vijay Pratap Singh."/>
                    <meta property="twitter:image" content="https://res.cloudinary.com/dyzcjrfca/image/upload/v1646415517/Election-Vote-2-icon_n4wj37.png"/>

                    <link rel="manifest" href="/manifest.json" />

                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-title" content="Brew"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="#4c84ff"/>
                    
                    <link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="96x96" href="/assets/icons/icon-96x96.png"/>
                    <link rel="apple-touch-icon" sizes="128x128" href="/assets/icons/icon-128x128.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="192x192" href="/assets/icons/icon-192x192.png"/>
                    <link rel="apple-touch-icon" sizes="384x384" href="/assets/icons/icon-384x384.png"/>
                    <link rel="apple-touch-icon" sizes="512x512" href="/assets/icons/icon-512x512.png"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}


export default MyDocument