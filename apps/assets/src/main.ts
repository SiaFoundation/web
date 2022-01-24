import * as express from 'express'
import { setupStatic } from './app'

const app = express()

setupStatic(app)

const port = process.env.PORT || 3002
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

server.on('error', console.error)
