module.exports = {
  apps: [
    {
      name: 'sia-website',
      script: 'nx',
      args: 'run website:serve:production',
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
      script: 'nx',
      args: 'run explorer-v1:serve:production',
      env: {
        PORT: 3003,
      },
    },
    {
      name: 'sia-design',
      cwd: 'dist/apps/design-site/',
      script: 'nx',
      args: 'run design-site:serve:production',
      env: {
        PORT: 3004,
      },
    },
  ],
}
