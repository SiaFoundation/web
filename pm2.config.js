module.exports = {
  apps: [
    {
      name: 'sia-beta',
      script: 'src/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
  ],
}
