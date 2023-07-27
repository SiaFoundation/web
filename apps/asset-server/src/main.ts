import dotenv from 'dotenv'
import express from 'express'
import { startCron } from './cron'
import { setupStatic } from './static'

dotenv.config()

const app = express()
setupStatic(app)

startCron()

console.log(`Assets running in ${process.env.NODE_ENV}`)

const port = 3002
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

server.on('error', console.error)
