# react-core

Core library for building React hooks for interacting with a Sia daemon.

## usage

react-core APIs are for building [swr](https://swr.vercel.app) interacting with
a Sia daemon.

### Declarative data fetching

To build a hook for making a GET request to renterd for a contract we would
create types for the params and response and use them with `HookArgsSwr` to
ensure the resulting hook is correctly typed.

```ts
type ContractParams = { id: string; extra?: string }
export function useContract(
  args: HookArgsSwr<ContractParams, ContractResponse>
) {
  return useGetSwr({ ...args, route: '/contracts/:id' })
}
```

The resulting hook is then used like any other swr hook, the return value is an
`SWRResponse` where data is of type `ConsensusStateResponse` and error is of
type `SWRError`.

```ts
const { data, isValidating, error } = useContract({
  params: { id: '123', extra: 'abc' },
})
```

The hook must be called with any required params. Params that are specified in
the route string are automatically replaced with the provided values, any others
are added to the query string. The above hook would make a request to
`/contracts/123?extra=abc`.

#### Configure swr and axios

`useGetSwr` and its siblings all accept a config object which can be used to
configure swr and axios. For example, to refresh the data every 10 seconds and
dedupe the request:

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

### Imperative mutations

Declarative hooks are great for fetching data, but sometimes you need a method
that can be used more imperatively, for example when submitting a form.

`usePostFunc` and its siblings are used for imperative mutations. Instead of
declaratively fetching, the following hook returns a method that can be called.
Besides the `HookArgsCallback` and route string, the method takes another
callback argument which provides access to a `mutate` function. The callback is
triggered any time the contract add method is called successfully. The `mutate`
function can be used to trigger revalidation on dependent keys to refresh data
that is affected by `useContractAdd`, such as the contracts list.

```ts
export function useContractAdd(
  args?: HookArgsCallback<
    ContractsAddParams,
    ContractsAddPayload,
    ContractsAddResponse
  >
) {
  return usePostFunc({ ...args, route: busContractIdNewRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(busContractRoute)
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
