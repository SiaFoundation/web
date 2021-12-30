import express from 'express'
import vhost from 'vhost'
import { parse } from 'url'
import next from 'next'
import { appDomain, dev } from '../config/site.js'

export async function setupApp(server) {
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
