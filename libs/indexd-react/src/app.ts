import {
  useDeleteFunc,
  useGetSwr,
  usePostFunc,
  HookArgsSwr,
  HookArgsCallback,
} from '@siafoundation/react-core'
import {
  type AppAuthCheckParams,
  type AppAuthCheckResponse,
  appAuthCheckRoute,
  type AppAuthConnectParams,
  type AppAuthConnectPayload,
  type AppAuthConnectResponse,
  appAuthConnectRoute,
  type AppAuthConnectStatusParams,
  type AppAuthConnectStatusResponse,
  appAuthConnectStatusRoute,
  type AppAuthConnectApproveParams,
  type AppAuthConnectApprovePayload,
  type AppAuthConnectApproveResponse,
  appAuthConnectApproveRoute,
  type AppHostsParams,
  type AppHostsResponse,
  appHostsRoute,
  type AppSlabsParams,
  type AppSlabsResponse,
  appSlabsRoute,
  type AppSlabPinParams,
  type AppSlabPinPayload,
  type AppSlabPinResponse,
  type AppSlabParams,
  type AppSlabResponse,
  appSlabsSlabIdRoute,
  type AppSlabDeleteParams,
  AppSlabDeletePayload,
  AppSlabDeleteResponse,
} from '@siafoundation/indexd-types'

// auth

export function useAuthConnect(
  args?: HookArgsCallback<
    AppAuthConnectParams,
    AppAuthConnectPayload,
    AppAuthConnectResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: appAuthConnectRoute,
  })
}

export function useAuthConnectStatus(
  args?: HookArgsSwr<AppAuthConnectStatusParams, AppAuthConnectStatusResponse>,
) {
  return useGetSwr({
    ...args,
    route: appAuthConnectStatusRoute,
  })
}

export function useAuthConnectApprove(
  args?: HookArgsCallback<
    AppAuthConnectApproveParams,
    AppAuthConnectApprovePayload,
    AppAuthConnectApproveResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: appAuthConnectApproveRoute,
  })
}

export function useAuthCheck(
  args?: HookArgsSwr<AppAuthCheckParams, AppAuthCheckResponse>,
) {
  return useGetSwr({
    ...args,
    route: appAuthCheckRoute,
  })
}

// hosts

export function useHosts(args?: HookArgsSwr<AppHostsParams, AppHostsResponse>) {
  return useGetSwr({
    ...args,
    route: appHostsRoute,
  })
}

// slabs

export function useSlabs(args?: HookArgsSwr<AppSlabsParams, AppSlabsResponse>) {
  return useGetSwr({
    ...args,
    route: appSlabsRoute,
  })
}

export function useSlabPin(
  args?: HookArgsCallback<
    AppSlabPinParams,
    AppSlabPinPayload,
    AppSlabPinResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: appSlabsRoute,
  })
}

export function useSlab(args?: HookArgsSwr<AppSlabParams, AppSlabResponse>) {
  return useGetSwr({
    ...args,
    route: appSlabsSlabIdRoute,
  })
}

export function useSlabDelete(
  args?: HookArgsCallback<
    AppSlabDeleteParams,
    AppSlabDeletePayload,
    AppSlabDeleteResponse
  >,
) {
  return useDeleteFunc({
    ...args,
    route: appSlabsSlabIdRoute,
  })
}
