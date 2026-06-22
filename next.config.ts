import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  transpilePackages: [
    'react-native',
    'react-native-web',
    'lucide-react-native',
    'react-native-svg',
  ],
};

export default nextConfig;