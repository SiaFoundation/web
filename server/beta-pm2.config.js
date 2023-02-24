module.exports = {
  apps: [
    {
      name: 'beta-sia-website',
      script: 'nx',
      args: 'run website:serve:production --port 3009',
    },
  ],
}
