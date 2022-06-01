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
      script: 'dist/apps/asset-server/main.js',
    },
    {
      name: 'sia-explorer-v1',
      cwd: 'dist/apps/explorer-v1/',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3003,
      },
    },
    {
      name: 'sia-design',
      cwd: 'dist/apps/design-site/',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3004,
      },
    },
  ],
}
