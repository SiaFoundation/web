module.exports = {
  apps: [
    {
      name: 'beta-sia-website',
      interpreter: 'nx',
      script: 'run',
      args: 'website:serve:production --port 3009',
    },
  ],
}
