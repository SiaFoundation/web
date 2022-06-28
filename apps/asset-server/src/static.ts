import { readdirSync } from 'fs'
import * as express from 'express'
import * as vhost from 'vhost'
import { counterMiddleware } from '@siafoundation/data-sources'
import { getSiaVersion } from '@siafoundation/env'
import { getHostnames } from './env'

export function setupStatic(server) {
  const hostnames = getHostnames()
  const siaVersion = getSiaVersion()

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

  server.use(vhost(hostnames.api, apiApp))

  // Rest of static assets on root domain
  const rootApp = express()
  // Serve binaries
  const releasesPath = getAssetPath('releases')
  rootApp.get('/releases', (req, res) => {
    res.redirect('/')
  })
  rootApp.use('/releases', counterMiddleware, express.static(releasesPath))

  // Serve transparency reports
  const transparencyPath = getAssetPath('transparency')
  rootApp.get('/transparency', (req, res) => {
    res.redirect('/')
  })
  rootApp.use(
    '/transparency',
    counterMiddleware,
    express.static(transparencyPath)
  )

  server.use(vhost(hostnames.app, rootApp))
}

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name)
}

function getAssetPath(resource) {
  return `assets/${resource}`
}
