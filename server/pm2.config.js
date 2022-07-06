module.exports = {
  apps: [
    {
      name: 'sia-website',
      interpreter: 'nx',
      script: 'run',
      args: 'website:serve:production',
    },
    {
      name: 'sia-assets',
      script: 'dist/apps/asset-server/main.js',
    },
    {
      name: 'sia-explorer-v1',
      interpreter: 'nx',
      script: 'run',
      args: 'explorer-v1:serve:production',
    },
    {
      name: 'sia-design',
      interpreter: 'nx',
      script: 'run',
      args: 'design-site:serve:production',
    },
  ],
}
