import dotenv from 'dotenv'

dotenv.config()

export const appDomain = process.env.APP_DOMAIN || 'sia.tech'
export const docDomain = process.env.DOC_DOMAIN || 'api.sia.tech'
export const port = process.env.PORT || 3000
export const dev = process.env.NODE_ENV !== 'production'
