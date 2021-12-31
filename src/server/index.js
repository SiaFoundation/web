require('dotenv').config()

const express = require('express')
const { setupStatic } = require('./static')
const { setupRedirects } = require('./redirect')
const { setupApp } = require('./app')
const { port, appDomain, apiDomain } = require('../config/env')

async function init() {
  console.log('\nSite')
  console.log(`App: ${appDomain}`)
  console.log(`API: ${apiDomain}`)

  // Setup root server
  const server = express()

  // Docs and other static assets
  setupStatic(server)

  // Historic redirects
  setupRedirects(server)

  // NextJS app
  setupApp(server)

  // Start server
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://0.0.0.0:${port}`)
  })
}

init()
