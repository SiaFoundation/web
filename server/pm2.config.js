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
      env: {
        EXPLORER_NETWORK: 'Sia Mainnet',
        EXPLORER_NAME: 'Explorer',
        NAVIGATOR_API: 'https://navigator.sia.tech',
      },
    },
    {
      name: 'sia-explorer-v1-testnet',
      interpreter: 'nx',
      script: 'run',
      args: 'explorer-v1:serve:production',
      env: {
        EXPLORER_NETWORK: 'Zen Testnet',
        EXPLORER_NAME: 'Zen Testnet',
        NAVIGATOR_API: 'https://navigator-zen.sia.tech',
      },
    },
    {
      name: 'sia-design',
      interpreter: 'nx',
      script: 'run',
      args: 'design-site:serve:production',
    },
  ],
}
