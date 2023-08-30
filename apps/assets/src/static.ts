import { readdirSync } from 'fs'
import express from 'express'
import { getAssetPath } from '@siafoundation/data-sources'

export async function setupStatic(server) {
  // Rest of static assets on root domain
  const rootApp = express()
  // Serve  all content directories
  const contentPath = getAssetPath('')
  const contentDirs = getDirectories(contentPath)
  contentDirs.forEach((dir) => {
    console.log('Serving static content for', dir)
    const contentPath = getAssetPath(dir)
    rootApp.get(`/${dir}`, (req, res) => {
      res.redirect('/')
    })
    rootApp.use(`/${dir}`, express.static(contentPath))
  })

  server.use(rootApp)
}

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((node) => node.isDirectory())
    .map((node) => node.name)
}
