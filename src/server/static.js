const { readdirSync } = require('fs')
const express = require('express')
const vhost = require('vhost')
const { downloadCountersMiddleware } = require('../lib/data/downloads')
const { docDomain, appDomain } = require('../config/site')
const { version } = require('../config/sia')

function setupStatic(server) {
  // Serve documentation on api domain
  const docsApp = express()
  const docsPath = 'public/docs'
  const docsVersions = getDirectories(docsPath)
  docsApp.use('/', express.static(`${docsPath}/${version.current}`))
  docsApp.use('/rc', express.static(`${docsPath}/${version.rc}`))
  docsVersions.forEach((version) => {
    docsApp.use(
      `/v${version.split('.').join('')}`,
      express.static(`${docsPath}/${version}`)
    )
  })
  console.log('Documentation versions')
  console.log(`\tCurrent: ${version.current}`)
  console.log(`\tRC: ${version.rc}`)
  console.log(`\tHistoric: ${docsVersions}`)
  console.log('')

  server.use(vhost(docDomain, docsApp))

  // Rest of static assets on root domain
  const staticApp = express()
  // Serve binaries
  const releasesPath = 'public/releases'
  staticApp.use(
    '/releases',
    downloadCountersMiddleware,
    express.static(releasesPath)
  )

  // Serve transparency reports
  const transparencyPath = 'public/transparency'
  staticApp.use('/transparency', express.static(transparencyPath))

  server.use(vhost(appDomain, staticApp))
}

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name)

module.exports = {
  setupStatic,
}
