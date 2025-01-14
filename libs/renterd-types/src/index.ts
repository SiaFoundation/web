export * from './bus'
export * from './autopilot'
export * from './worker'
export * from './types'

// Auth

export const authRoute = '/auth'

export type AuthTokenParams = {
  validity: number
}
export type AuthTokenPayload = void
export type AuthTokenResponse = {
  token: string
}
