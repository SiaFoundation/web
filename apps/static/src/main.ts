import * as express from 'express'
import { setupStatic } from './app'
import { appDomain } from './app/env'

const app = express()

setupStatic(app)

const port = process.env.port || 3333
const server = app.listen(port, () => {
  console.log(`Listening at http://${appDomain}:${port}`)
})

server.on('error', console.error)
