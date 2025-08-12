import {
  type AppAuthCheckParams,
  type AppAuthCheckPayload,
  type AppAuthCheckResponse,
  appAuthCheckRoute,
  type AppAuthConnectParams,
  type AppAuthConnectPayload,
  type AppAuthConnectResponse,
  appAuthConnectRoute,
  type AppAuthConnectStatusParams,
  type AppAuthConnectStatusPayload,
  type AppAuthConnectStatusResponse,
  appAuthConnectStatusRoute,
  type AppAuthConnectApproveParams,
  type AppAuthConnectApprovePayload,
  type AppAuthConnectApproveResponse,
  appAuthConnectApproveRoute,
  type AppHostsParams,
  type AppHostsPayload,
  type AppHostsResponse,
  appHostsRoute,
  type AppSlabsParams,
  type AppSlabsPayload,
  type AppSlabsResponse,
  appSlabsRoute,
  type AppSlabPinParams,
  type AppSlabPinPayload,
  type AppSlabPinResponse,
  type AppSlabParams,
  type AppSlabPayload,
  type AppSlabResponse,
  appSlabsSlabIdRoute,
  type AppSlabDeleteParams,
  type AppSlabDeletePayload,
  type AppSlabDeleteResponse,
} from '@siafoundation/indexd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function App({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    authConnect: buildRequestHandler<
      AppAuthConnectParams,
      AppAuthConnectPayload,
      AppAuthConnectResponse
    >(axios, 'post', appAuthConnectRoute),
    authConnectStatus: buildRequestHandler<
      AppAuthConnectStatusParams,
      AppAuthConnectStatusPayload,
      AppAuthConnectStatusResponse
    >(axios, 'get', appAuthConnectStatusRoute),
    authConnectApprove: buildRequestHandler<
      AppAuthConnectApproveParams,
      AppAuthConnectApprovePayload,
      AppAuthConnectApproveResponse
    >(axios, 'post', appAuthConnectApproveRoute),
    authCheck: buildRequestHandler<
      AppAuthCheckParams,
      AppAuthCheckPayload,
      AppAuthCheckResponse
    >(axios, 'get', appAuthCheckRoute),
    hosts: buildRequestHandler<
      AppHostsParams,
      AppHostsPayload,
      AppHostsResponse
    >(axios, 'get', appHostsRoute),
    slabs: buildRequestHandler<
      AppSlabsParams,
      AppSlabsPayload,
      AppSlabsResponse
    >(axios, 'get', appSlabsRoute),
    slabPin: buildRequestHandler<
      AppSlabPinParams,
      AppSlabPinPayload,
      AppSlabPinResponse
    >(axios, 'post', appSlabsRoute),
    slab: buildRequestHandler<AppSlabParams, AppSlabPayload, AppSlabResponse>(
      axios,
      'get',
      appSlabsSlabIdRoute,
    ),
    slabDelete: buildRequestHandler<
      AppSlabDeleteParams,
      AppSlabDeletePayload,
      AppSlabDeleteResponse
    >(axios, 'delete', appSlabsSlabIdRoute),
  }
}
