# react-core

Core library for building [SWR](https://swr.vercel.app) React hooks for RPC with a Sia daemon.

## usage

### Declarative data fetching

To build a hook for making a GET request to renterd for a contract we would create types for the params and response and use them with `HookArgsSwr` to ensure the resulting hook is correctly typed.

```ts
type ContractParams = { id: string; extra?: string }
export function useContract(
  args: HookArgsSwr<ContractParams, ContractResponse>
) {
  return useGetSwr({ ...args, route: '/contracts/:id' })
}
```

The resulting hook is then used like any other SWR hook, the return value is an `SWRResponse` where data is of type `ConsensusStateResponse` and error is of type `SWRError`.

```ts
const { data, isValidating, error } = useContract({
  params: { id: '123', extra: 'abc' },
})
```

The hook must be called with any required params. Params that are specified in the route string are automatically replaced with the provided values, any others are added to the query string. The above hook would make a request to `/contracts/123?extra=abc`.

### Revalidation

The hook will automatically revalidate whenever the underlying SWR key changes. The components of the unique key are the route, request method, parameters, and payload.

### Configuring SWR and Axios

`useGetSwr` and its siblings all accept a config object which can be used to configure SWR and Axios. For example, to refresh the data every 10 seconds and dedupe the request:

```ts
useGetSwr({
  route: '/contracts/:id',
  config: {
    swr: {
      refreshInterval: 10_000,
      dedupingInterval: 10_000,
    },
  },
})
```

To use an abort signal with a long-running request:

```ts
useGetSwr({
  route: '/contracts/:id',
  config: {
    axios: {
      signal: controller.signal,
    },
  },
})
```

### Imperative methods

Declarative hooks are great for fetching data, but sometimes you need a method that can be used more imperatively, for example when submitting a form.

`usePostFunc` and its siblings are used for imperative methods. Instead of declaratively fetching, the hook returns a method that can be called later imperatively. Besides the `HookArgsCallback` and route string, the method takes another callback argument which provides access to a `mutate` function. The callback is triggered any time the returned method is called successfully. The `mutate` function can be used to trigger revalidation and/or optimistically mutate data on dependent routes to refresh data that is affected by the method. For example, adding a contract with `useContractAdd` may affect the contracts list therefore in the example below we revalidate data under that route.

```ts
export function useContractAdd(
  args?: HookArgsCallback<
    ContractsAddParams,
    ContractsAddPayload,
    ContractsAddResponse
  >
) {
  return usePostFunc({ ...args, route: busContractIdNewRoute }, async (mutate) => {
    mutate((route) => {
      return route.startsWith(busContractRoute)
    })
  })
}

const addContract = useContractAdd()

function handleSubmit(values: Values) {
  const { status, data, error } = await addContract({
    params: { id: '123', extra: 'abc' },
    payload: {
      contract: contractRevision
      startHeight: 40000
      totalCost: '2424242421223232'
    }
  })
}
```

#### Workflows

The lifecycle of imperative methods are tracked by a workflow ID. Workflows allow the consumer to check whether a call is still pending or complete from a code that may not be near the actual hook call. The following code shows a method's workflow status being looked up by matching on the route and payload.

```ts
// Hook
export function useRhpScan(
  args?: HookArgsCallback<RhpScanParams, RhpScanPayload, RhpScanResponse>
) {
  return usePostFunc({ ...args, route: workerRhpScanRoute })
}

// Usage
const rescan = useRhpScan()
await rescan.post({
  payload: {
    hostKey: publicKey,
    hostIP: address,
    timeout: secondsInMilliseconds(30),
  },
})
```

```ts
// Check the workflow status.
const { workflows } = useWorkflows()
const isPending = workflows.find((w) => {
  return (
    w.route?.startsWith(workerRhpScanRoute) &&
    w.payload?.hostKey === data.publicKey
  )
})
```

### Global mutate

The `mutate` method returned by `useMutate` or the one available via callback on the imperative mutation hooks. Both match against routes. Note that this is not the same as the underlying keys which are array tuples of method and API prefixed route plus serialized params and payload. The mutate method allows matching against the plain route string.

### Typing hooks

When building hooks, use the following types for the args parameter:

| name          | args type                                         |
| ------------- | ------------------------------------------------- |
| useGetSwr     | HookArgsSwr<Params, Response>                     |
| usePostSwr    | HookArgsWithPayloadSwr<Params, Payload, Response> |
| usePutSwr     | HookArgsWithPayloadSwr<Params, Payload, Response> |
| useGetFunc    | HookArgsCallback<Params, void, Response>          |
| usePostFunc   | HookArgsCallback<Params, Payload, Response>       |
| usePutFunc    | HookArgsCallback<Params, Payload, Response>       |
| useDeleteFunc | HookArgsCallback<Params, void, Response>          |
