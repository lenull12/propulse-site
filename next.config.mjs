/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
}

export default nextConfig