const express = require('express')
const { setupStatic } = require('./static')
const { setupRedirects } = require('./redirect')
const { setupApp } = require('./app')
const { port, appDomain, docDomain } = require('../config/site')

async function init() {
  console.log('\nSite\n')
  console.log(`Application: ${appDomain}`)
  console.log(`Documentation: ${docDomain}`)
  console.log('')

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
