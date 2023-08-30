module.exports = {
  apps: [
    {
      name: 'sia-website',
      script: 'nx',
      args: 'run website:serve:production',
    },
    {
      name: 'sia-assets',
      script: 'nx',
      args: 'run assets:serve:production',
    },
    {
      name: 'sia-crons',
      script: 'nx',
      args: 'run crons:serve:production',
    },
    {
      name: 'sia-explorer-v1',
      script: 'nx',
      args: 'run explorer-v1:serve:production',
    },
    {
      name: 'sia-explorer-v1-testnet',
      script: 'nx',
      args: 'run explorer-v1:serve:production-testnet',
    },
    {
      name: 'sia-renter',
      script: 'nx',
      args: 'run renterd:serve:production',
    },
    {
      name: 'sia-host',
      script: 'nx',
      args: 'run hostd:serve:production',
    },
    {
      name: 'sia-wallet',
      script: 'nx',
      args: 'run walletd:serve:production',
    },
  ],
}
