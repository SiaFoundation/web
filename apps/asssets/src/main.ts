import * as express from 'express'
import { setupStatic } from './app'
import { appDomain } from '@siafoundation/env'

const app = express()

setupStatic(app)

const port = process.env.ASSETS_PORT || 3001
const server = app.listen(port, () => {
  console.log(`Listening at http://${appDomain}:${port}`)
})

server.on('error', console.error)
