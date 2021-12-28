module.exports = {
  apps: [
    {
      name: 'sia-beta',
      script: 'src/server/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
  ],
}
