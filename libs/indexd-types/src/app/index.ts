import type { Host } from '../types'
import type { PinnedSlab, SlabPinParams } from './types'

// Auth

export const appAuthConnectRoute = '/auth/connect'
export type AppAuthConnectParams = void
export type AppAuthConnectPayload = {
  name: string
  description: string
  logoURL: string
  serviceURL: string
  callbackURL: string
}
export type AppAuthConnectResponse = {
  responseURL: string
  statusURL: string
  expiration: string
}

export const appAuthConnectStatusRoute = '/auth/connect/:requestID/status'
export type AppAuthConnectStatusParams = {
  requestID: string
}
export type AppAuthConnectStatusPayload = void
export type AppAuthConnectStatusResponse = {
  approved: boolean
}

export const appAuthConnectApproveRoute = '/auth/connect/:requestID'
export type AppAuthConnectApproveParams = {
  requestID: string
}
export type AppAuthConnectApprovePayload = {
  approve: boolean
}
export type AppAuthConnectApproveResponse = void

export const appAuthCheckRoute = '/auth/check'
export type AppAuthCheckParams = void
export type AppAuthCheckPayload = void
export type AppAuthCheckResponse = void

// Hosts

export const appHostsRoute = '/hosts'
export type AppHostsParams = {
  offset?: number
  limit?: number
}
export type AppHostsPayload = void
export type AppHostsResponse = Host[]

// Slabs

export const appSlabsRoute = '/slabs'
export type AppSlabsParams = {
  offset?: number
  limit?: number
}
export type AppSlabsPayload = void
export type AppSlabsResponse = string[]

export type AppSlabPinParams = void
export type AppSlabPinPayload = SlabPinParams
export type AppSlabPinResponse = string

export const appSlabsSlabIdRoute = '/slabs/:slabid'
export type AppSlabParams = {
  slabid: string
}
export type AppSlabPayload = void
export type AppSlabResponse = PinnedSlab

export type AppSlabDeleteParams = {
  slabid: string
}
export type AppSlabDeletePayload = void
export type AppSlabDeleteResponse = void
