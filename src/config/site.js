const appDomain = process.env.APP_DOMAIN || 'sia.tech'
const docDomain = process.env.DOC_DOMAIN || 'api.sia.tech'
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  appDomain,
  docDomain,
  port,
  dev,
}
