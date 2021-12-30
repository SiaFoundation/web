import { readdirSync } from 'fs'
import express from 'express'
import vhost from 'vhost'
import { downloadCountersMiddleware } from '../lib/data/downloads.js'
import { docDomain, appDomain } from '../config/site.js'
import { version } from '../config/sia.js'

export function setupStatic(server) {
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
