/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['bit.ly', 'i.postimg.cc', 'ibb.co', 'i.ibb.co', 's4.gifyu.com', 'imgcdn.floweraura.com'],
        unoptimized: true
    },
}

export default nextConfig;