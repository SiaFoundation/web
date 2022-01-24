module.exports = {
  apps: [
    {
      name: 'sia-website',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
    {
      name: 'sia-assets',
      script: 'dist/assets/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3002',
      },
    },
  ],
}
