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
      interpreter: 'nx',
      script: 'run',
      args: 'asset-server:serve:production',
    },
    {
      name: 'sia-explorer-v1',
      interpreter: 'nx',
      script: 'run',
      args: 'explorer-v1:serve:production',
    },
    {
      name: 'sia-explorer-v1-testnet',
      interpreter: 'nx',
      script: 'run',
      args: 'explorer-v1:serve:production-testnet',
    },
    {
      name: 'sia-design',
      interpreter: 'nx',
      script: 'run',
      args: 'design-site:serve:production',
    },
    {
      name: 'sia-renter',
      interpreter: 'nx',
      script: 'run',
      args: 'renterd:serve:production',
    },
  ],
}
