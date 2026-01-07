import React from "react";
import Head from "next/head";
import AppData from "@data/app.json";

import '../styles/scss/style.scss';
import "../styles/globals.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          {/* seo begin */}
          <title>{AppData.settings.siteName}</title>
          <meta name="description" content="Grozone - Kiến tạo công nghệ. Kết quả bền vững. Chúng tôi thu hẹp khoảng cách giữa tham vọng chiến lược và thực tế vận hành." />
          <meta name="keywords" content="Grozone, công nghệ, phần mềm, giải pháp IT, phát triển ứng dụng, AI, machine learning" />
          <meta name="author" content="Grozone" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.grozone.co" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.grozone.co" />
          <meta property="og:title" content={AppData.settings.siteName} />
          <meta property="og:description" content="Grozone - Kiến tạo công nghệ. Kết quả bền vững." />
          <meta property="og:image" content="/img/grozone_favicon.ico" />
          <meta property="og:site_name" content={AppData.settings.siteName} />
          <meta property="og:locale" content="vi_VN" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://www.grozone.co" />
          <meta name="twitter:title" content={AppData.settings.siteName} />
          <meta name="twitter:description" content="Grozone - Kiến tạo công nghệ. Kết quả bền vững." />
          <meta name="twitter:image" content="/img/grozone_favicon.ico" />
          
          {/* seo end */}        
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
