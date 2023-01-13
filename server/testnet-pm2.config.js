module.exports = {
  apps: [
    {
      name: 'sia-explorer-v1-testnet',
      interpreter: 'nx',
      script: 'run',
      args: 'explorer-v1:serve:production-testnet',
      env: {
        EXPLORER_NETWORK: 'Zen Testnet',
        EXPLORER_NAME: 'Zen Testnet',
        NAVIGATOR_API: 'https://navigator-zen.sia.tech',
      },
    },
  ],
}
