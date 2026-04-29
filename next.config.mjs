/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/san-pham",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/san-pham/:slug",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/tin-tuc",
        permanent: true,
      },
      {
        source: "/news/:slug",
        destination: "/tin-tuc/:slug",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/lien-he",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
