/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/personal-domain",
  assetPrefix: "/personal-domain",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
