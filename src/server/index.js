import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { initDownloadCounters } from '../lib/data/downloads.js'
import { setupStatic } from './static.js'
import { setupRedirects } from './redirect.js'
import { setupApp } from './app.js'
import { port, appDomain, docDomain } from '../config/site.js'

async function init() {
  console.log('Site')
  console.log('')
  console.log(`Application: ${appDomain}`)
  console.log(`Documentation: ${docDomain}`)
  console.log('')

  // Setup root server
  const server = express()

  // Initialization
  initDownloadCounters()

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
