/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn-icons-png.flaticon.com', 'res.cloudinary.com'],
        unoptimized: process.env.NODE_ENV === 'development',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            }
        ],
    },
    async redirects() {
        return [];
    },
    async rewrites() {
        return [
            {
                source: '/poetry/:slug*',
                destination: '/poetry/:slug*',
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
