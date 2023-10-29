const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  // output: 'export'
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"]
  },
  images: {
    domains: ['zxyoyo.com']
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  }
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
