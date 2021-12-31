const { readdirSync } = require('fs')
const express = require('express')
const vhost = require('vhost')
const { counterMiddleware } = require('../lib/data/counts.js')
const { docDomain, appDomain } = require('../config/site.js')
const { version } = require('../config/sia.js')

function setupStatic(server) {
  // Serve documentation on api domain
  const docsApp = express()
  const docsPath = getAssetPath('docs')
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
  const releasesPath = getAssetPath('releases')
  staticApp.use('/releases', counterMiddleware, express.static(releasesPath))

  // Serve transparency reports
  const transparencyPath = getAssetPath('transparency')
  staticApp.use(
    '/transparency',
    counterMiddleware,
    express.static(transparencyPath)
  )

  server.use(vhost(appDomain, staticApp))
}

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name)
}

function getAssetPath(resource) {
  return `public/${resource}`
}

module.exports = {
  setupStatic,
}
