import { readdirSync } from 'fs'
import * as express from 'express'
import * as vhost from 'vhost'
import { counterMiddleware } from '@siafoundation/data-sources'
import { getContentPath, readJsonFile } from '@siafoundation/env'
import { getHostnames } from './env'

export function setupStatic(server) {
  const hostnames = getHostnames()
  const versions = getVersions()

  // Serve api docs on the api domain
  const apiApp = express()
  const apiPath = getContentPath('docs')
  const apiVersions = getDirectories(apiPath)
  apiApp.use('/', express.static(`${apiPath}/${versions.sia.latest}`))
  apiApp.use(
    '/rc',
    express.static(`${apiPath}/${versions.sia.rc || versions.sia.latest}`)
  )
  apiVersions.forEach((version) => {
    apiApp.use(
      `/v${version.split('.').join('')}`,
      express.static(`${apiPath}/${version}`)
    )
  })
  console.log('API versions')
  console.log(`\tLatest: ${versions.sia.latest}`)
  console.log(`\tRC: ${versions.sia.rc}`)
  console.log(`\tHistoric: ${apiVersions}\n`)

  server.use(vhost(hostnames.api, apiApp))

  // Rest of static assets on root domain
  const rootApp = express()
  // Serve binaries
  const releasesPath = getContentPath('releases')
  rootApp.get('/releases', (req, res) => {
    res.redirect('/')
  })
  rootApp.use('/releases', counterMiddleware, express.static(releasesPath))

  // Serve transparency reports
  const transparencyPath = getContentPath('transparency')
  rootApp.get('/transparency', (req, res) => {
    res.redirect('/')
  })
  rootApp.use(
    '/transparency',
    counterMiddleware,
    express.static(transparencyPath)
  )

  // Serve rss feeds
  const rssPath = getContentPath('rss')
  rootApp.get('/rss', (req, res) => {
    res.redirect('/')
  })
  rootApp.use('/rss', counterMiddleware, express.static(rssPath))

  server.use(vhost(hostnames.app, rootApp))
}

type Versions = {
  sia: {
    latest: string
    rc: string
  }
  embarcadero: {
    latest: string
  }
}

function getVersions(): Versions {
  return readJsonFile('versions.json', {
    sia: {
      latest: '1.5.9',
      rc: '1.5.9',
    },
    embarcadero: {
      latest: '1.0.0',
    },
  })
}

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name)
}
