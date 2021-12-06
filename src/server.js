const { readdirSync } = require('fs')
const express = require('express')
const { parse } = require('url')
const next = require('next')
const {
  downloadCountersMiddleware,
  initDownloadCounters,
} = require('./lib/data/downloads')
const { version } = require('./config/sia')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

async function init() {
  // Setup
  const app = next({ dev })
  const handle = app.getRequestHandler()
  await app.prepare()
  const server = express()

  // Initialization
  initDownloadCounters()

  // Serve documentation
  const docsPath = 'public/docs'
  const docsVersions = getDirectories(docsPath)
  server.use('/docs', express.static(`${docsPath}/${version.current}`))
  docsVersions.forEach((version) => {
    server.use(
      `/docs/v${version.replaceAll('.', '')}`,
      express.static(`${docsPath}/${version}`)
    )
  })
  console.log('Documentation versions')
  console.log(`\tCurrent: ${version.current}`)
  console.log(`\tRC: ${version.rc}`)
  console.log(`\tHistoric: ${docsVersions}`)

  // Serve binaries
  server.use(
    '/releases',
    downloadCountersMiddleware,
    express.static('public/releases')
  )

  // Defer to NextJS to serve APIs and website
  server.all('*', (req, res) => {
    const url = parse(req.url, true)
    return handle(req, res, url)
  })

  // Start server
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://0.0.0.0:${port}`)
  })
}

init()

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name)
