module.exports = {
  basePath: '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@ionic/react',
    '@ionic/core',
    '@stencil/core',
    '@capacitor/core',
    'ionicons',
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};
