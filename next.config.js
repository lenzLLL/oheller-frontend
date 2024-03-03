/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com','images.pexels.com','res.cloudinary.com','plus.unsplash.com'],

  },
  env:{
      SERVER_URL:"http://localhost:8080"  
  }
}

module.exports = nextConfig
