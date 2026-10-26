import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          {/* meta begin */}
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
          
          {/* Favicon - Multiple sizes for better compatibility */}
          <link rel="icon" type="image/x-icon" href="/img/grozone_favicon.ico" />
          <link rel="shortcut icon" type="image/x-icon" href="/img/grozone_favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/img/grozone_favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/img/grozone_favicon.ico" />
          <link rel="icon" type="image/png" sizes="96x96" href="/img/grozone_favicon.ico" />
          
          {/* Apple Touch Icon for iOS devices */}
          <link rel="apple-touch-icon" sizes="180x180" href="/img/grozone_favicon.ico" />
          
          {/* Android Chrome Icons */}
          <link rel="icon" type="image/png" sizes="192x192" href="/img/grozone_favicon.ico" />
          <link rel="icon" type="image/png" sizes="512x512" href="/img/grozone_favicon.ico" />
          
          {/* Meta tags for SEO and Social Sharing */}
          <meta name="theme-color" content="#1a1a2e" />
          <meta name="msapplication-TileColor" content="#1a1a2e" />
          <meta name="msapplication-TileImage" content="/img/grozone_favicon.ico" />
          
          {/* meta end */}

          {/* Google Fonts preconnect for better performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          {/* public assets begin */}
          <link rel="stylesheet" href="/css/plugins/bootstrap-grid.css" />
          <link rel="stylesheet" href="/css/plugins/font-awesome.min.css" />
          <link rel="stylesheet" href="/css/plugins/swiper.min.css" />
          <link rel="stylesheet" href="/css/plugins/magnific-popup.css" />  
          {/* public assets end */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
