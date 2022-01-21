const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const appDomain = process.env.APP_DOMAIN || 'sia.tech'
const apiDomain = process.env.API_DOMAIN || 'api.sia.tech'

const current = process.env.SIA_CURRENT || '1.5.5'
const rc = process.env.SIA_RC || '1.5.5'

const siaVersion = {
  current,
  rc,
}

export { appDomain, apiDomain, siaVersion, port, dev }
