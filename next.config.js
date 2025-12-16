/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirect tất cả routes về /404 (có thể bật/tắt bằng biến môi trường ENABLE_404_REDIRECT)
  // Để tắt: đặt ENABLE_404_REDIRECT=false trong file .env hoặc xóa biến đó
  async redirects() {
    // Kiểm tra biến môi trường để bật/tắt redirect
    // Mặc định: nếu không có biến môi trường thì bật redirect (true)
    const enableRedirect = process.env.ENABLE_404_REDIRECT !== 'false';
    
    if (!enableRedirect) {
      return [];
    }

    return [
      {
        source: '/',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/blog',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/blog/:path*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/projects',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/projects/:path*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/services/:path*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/team',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/home-2',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/projects-2',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/projects-3',
        destination: '/404',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
