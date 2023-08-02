/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['uhdtv.io', 'upload.wikimedia.org', 'mango.blender.org', 'download.blender.org']
    }
}

module.exports = nextConfig
