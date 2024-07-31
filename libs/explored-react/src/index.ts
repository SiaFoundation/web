import { useGetSwr, HookArgsSwr } from '@siafoundation/react-core'
import {
  ExampleParams,
  ExampleResponse,
  exampleRoute,
} from '@siafoundation/explored-types'

export function useExample(args?: HookArgsSwr<ExampleParams, ExampleResponse>) {
  return useGetSwr({
    ...args,
    route: exampleRoute,
  })
}
