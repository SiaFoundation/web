module.exports = {
  apps: [
    {
      name: 'sia-website',
      cwd: 'dist/apps/website/',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3001,
      },
    },
    {
      name: 'sia-assets',
      script: 'dist/apps/assets/main.js',
    },
  ],
}
