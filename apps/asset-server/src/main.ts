import * as dotenv from 'dotenv'
import { getPorts } from '@siafoundation/env'
import * as express from 'express'
import { setupStatic } from './app'

dotenv.config()

const app = express()

setupStatic(app)

console.log(`Assets running in ${process.env.NODE_ENV}`)

const port = getPorts().assets || 3002
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

server.on('error', console.error)
