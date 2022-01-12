const { readdirSync } = require('fs')
const express = require('express')
const vhost = require('vhost')
const { counterMiddleware } = require('../lib/data/counts')
const { apiDomain, appDomain } = require('../config/env')
const { siaVersion } = require('../config/env')

function setupStatic(server) {
  // Serve api docs on the api domain
  const apiApp = express()
  const apiPath = getAssetPath('docs')
  const apiVersions = getDirectories(apiPath)
  apiApp.use('/', express.static(`${apiPath}/${siaVersion.current}`))
  apiApp.use('/rc', express.static(`${apiPath}/${siaVersion.rc}`))
  apiVersions.forEach((version) => {
    apiApp.use(
      `/v${version.split('.').join('')}`,
      express.static(`${apiPath}/${version}`)
    )
  })
  console.log('API versions')
  console.log(`\tCurrent: ${siaVersion.current}`)
  console.log(`\tRC: ${siaVersion.rc}`)
  console.log(`\tHistoric: ${apiVersions}\n`)

  server.use(vhost(apiDomain, apiApp))

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
