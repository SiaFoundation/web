module.exports = {
  apps: [
    {
      name: 'sia-website',
      script: 'nx',
      args: 'serve website --prod',
    },
    {
      name: 'sia-assets',
      script: 'nx',
      args: 'serve assets --prod',
    },
  ],
}
