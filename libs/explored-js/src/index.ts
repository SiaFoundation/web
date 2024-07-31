import { buildRequestHandler, initAxios } from '@siafoundation/request'
import {
  exampleRoute,
  ExampleParams,
  ExamplePayload,
  ExampleResponse,
} from '@siafoundation/explored-types'

export function Explored({
  api,
  password,
}: {
  api: string
  password?: string
}) {
  const axios = initAxios(api, password)
  return {
    axios,
    state: buildRequestHandler<ExampleParams, ExamplePayload, ExampleResponse>(
      axios,
      'get',
      exampleRoute
    ),
  }
}
