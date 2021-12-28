const express = require('express')
const vhost = require('vhost')
const { parse } = require('url')
const next = require('next')
const { appDomain, dev } = require('../config/site')

async function setupApp(server) {
  // Setup
  const app = express()
  const nextApp = next({ dev })
  const handle = nextApp.getRequestHandler()
  await nextApp.prepare()

  // Defer to NextJS to serve next api and website
  app.all('*', (req, res) => {
    const url = parse(req.url, true)
    return handle(req, res, url)
  })
  server.use(vhost(appDomain, app))
}

module.exports = {
  setupApp,
}
