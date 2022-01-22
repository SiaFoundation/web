module.exports = {
  apps: [
    {
      name: 'sia-website',
      script: 'dist/website/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
    {
      name: 'sia-assets',
      script: 'dist/assets/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3002',
      },
    },
  ],
}
