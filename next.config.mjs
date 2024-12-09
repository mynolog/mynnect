/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 구글 프로필 이미지
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/*',
      },
      // 깃허브 프로필 이미지
      {
        protocol: 'https',
        hostname: 'githubusercontent.com',
        pathname: '/u/*',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/*',
      },
    ],
  },
}

export default nextConfig
