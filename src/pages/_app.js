import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AppData from "@data/app.json";

import '../styles/scss/style.scss';
import "../styles/globals.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Redirect tất cả routes về /404 (có thể bật/tắt bằng biến môi trường NEXT_PUBLIC_ENABLE_404_REDIRECT)
  // Để tắt: đặt NEXT_PUBLIC_ENABLE_404_REDIRECT=false trong file .env hoặc xóa biến đó
  useEffect(() => {
    // Kiểm tra biến môi trường để bật/tắt redirect
    const enableRedirect = process.env.NEXT_PUBLIC_ENABLE_404_REDIRECT === 'true';
    
    if (!enableRedirect) {
      return;
    }

    // Chỉ chạy trên client-side
    if (typeof window === 'undefined') {
      return;
    }

    const { pathname, isReady } = router;
    
    // Đợi router sẵn sàng
    if (!isReady) {
      return;
    }
    
    // Cho phép truy cập vào trang 404
    if (pathname === '/404') {
      return;
    }

    // Cho phép truy cập vào API routes và static files
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/img') ||
      pathname.startsWith('/css')
    ) {
      return;
    }

    // Redirect tất cả các routes khác về /404
    // Kiểm tra để tránh redirect nhiều lần
    if (pathname !== '/404' && window.location.pathname !== '/404') {
      router.replace('/404');
    }
  }, [router.pathname, router.isReady]);

  return (
    <>
      <Head>
          {/* seo begin */}
          <title>{AppData.settings.siteName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* seo end */}        
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
