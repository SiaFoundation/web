import { AppSettingsProvider } from './appSettings'
import { render, waitFor } from '@testing-library/react'
import { CoreProvider } from './coreProvider'
import { useGetSwr } from './useGet'
import { UseMutateReturn, useMutate } from './mutate'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { usePostFunc, usePostSwr } from './usePost'
import { RequestConfig, Response } from './request'
import { delay } from './utils'
import { WorkflowPayload, useWorkflows } from './workflows'
import { act } from 'react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {},
    push: jest.fn(),
  }),
  usePathname: jest.fn().mockReturnValue('/some-route'),
}))

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('react-core', () => {
  test('swr hook data fetching and mutate matcher', async () => {
    mockEndpoint('post', '/api/a/b', 'ab')
    mockEndpoint('get', '/api/a', 'a')

    let mutate: UseMutateReturn = () => Promise.resolve([])
    function Component() {
      const a = useGetSwr<void, string>({
        route: '/a',
      })
      const ab = usePostSwr<void, void, string>({
        route: '/a/b',
      })
      mutate = useMutate()
      const str = a.data && ab.data ? a.data + ab.data : ''
      if (!str) return 'loading'
      return str
    }

    const el = render(
      <CoreProvider>
        <AppSettingsProvider>
          <Component />
        </AppSettingsProvider>
      </CoreProvider>
    )

    // Check that the initial render is correct.
    await waitFor(() => {
      expect(el.getByText('aab')).toBeTruthy()
    })

    // Update endpoint responses.
    mockEndpoint('post', '/api/a/b', 'xy')
    mockEndpoint('get', '/api/a', 'x')

    // Data should be the same.
    await waitFor(() => {
      expect(el.getByText('aab')).toBeTruthy()
    })

    // Revalidate by route, matching does not include the api prefix.
    mutate((route) => route.startsWith('/a'))

    // Data should be updated.
    await waitFor(() => {
      expect(el.getByText('xxy')).toBeTruthy()
    })
  })

  test('swr hook with same route but different payloads act as distinct keys', async () => {
    mockEndpointByPayload('post', '/api/a')

    let mutate: UseMutateReturn = () => Promise.resolve([])
    function Component({ foo1, foo2 }: { foo1: string; foo2: string }) {
      const a1 = usePostSwr<void, { foo: string }, { foo: string }>({
        route: '/a',
        payload: { foo: foo1 },
      })
      const a2 = usePostSwr<void, { foo: string }, { foo: string }>({
        route: '/a',
        payload: { foo: foo2 },
      })
      mutate = useMutate()
      const str =
        a1.data && a2.data
          ? JSON.stringify(a1.data) + JSON.stringify(a2.data)
          : ''
      if (!str) return 'loading'
      return str
    }

    const el = render(
      <CoreProvider>
        <AppSettingsProvider>
          <Component foo1="bar" foo2="jazz" />
        </AppSettingsProvider>
      </CoreProvider>
    )

    // Check that the initial render is correct.
    await waitFor(() => {
      expect(el.getByText('{"foo":"bar"}{"foo":"jazz"}')).toBeTruthy()
    })

    const startingCallCount = networkCallCount

    el.rerender(
      <CoreProvider>
        <AppSettingsProvider>
          <Component foo1="baz" foo2="jazz" />
        </AppSettingsProvider>
      </CoreProvider>
    )

    await waitFor(() => {
      // Check that the rerender is correct.
      expect(el.getByText('{"foo":"baz"}{"foo":"jazz"}')).toBeTruthy()
      // Check that only 1 hook was revalidated.
      expect(networkCallCount - startingCallCount).toBe(1)
    })

    // Revalidate both by route.
    mutate((route) => route.startsWith('/a'))

    // Check that both hooks were revalidated.
    await waitFor(() => {
      expect(el.getByText('{"foo":"baz"}{"foo":"jazz"}')).toBeTruthy()
      expect(networkCallCount - startingCallCount).toBe(3)
    })
  })

  test('func is tracked by workflow and revalidates its dependencies', async () => {
    mockEndpoint('get', '/api/dependency', 'response1')
    mockEndpoint('post', '/api/postroute', '', 200)

    let post: (args: {
      api?: string | undefined
      config?: RequestConfig<void, string> | undefined
    }) => Promise<Response<string>> = () => {
      throw new Error('not implemented')
    }
    let workflows: { workflows: WorkflowPayload[] } = { workflows: [] }

    function Component() {
      workflows = useWorkflows()
      const dependency = useGetSwr<void, string>({
        route: '/dependency',
      })
      const func = usePostFunc<void, void, string>(
        {
          route: '/postroute',
        },
        async (mutate) => {
          mutate((route) => route.startsWith('/dependency'))
        }
      )
      post = func.post
      return dependency.data
    }

    const el = render(
      <CoreProvider>
        <AppSettingsProvider>
          <Component />
        </AppSettingsProvider>
      </CoreProvider>
    )

    // Check that the initial render is correct.
    await waitFor(() => {
      expect(el.getByText('response1')).toBeTruthy()
    })

    // Change the dependency endpoint response.
    mockEndpoint('get', '/api/dependency', 'response2')

    let promise: Promise<Response<string>> | undefined
    act(() => {
      // Call the post function.
      promise = post({})
    })

    // Check that the workflow is registered.
    expect(
      workflows.workflows.find(
        (w?: { route?: string }) => w?.route === '/postroute'
      )
    ).toBeTruthy()

    await act(async () => {
      // Wait for the promise to resolve.
      await promise
    })

    // Check that the workflow has been removed.
    expect(
      workflows.workflows.find(
        (w?: { route?: string }) => w?.route === '/postroute'
      )
    ).toBeFalsy()

    // Dependency should have been revalidated.
    await waitFor(() => {
      expect(el.getByText('response2')).toBeTruthy()
    })
  })
})

let networkCallCount = 0

function mockEndpoint(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  route: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any,
  delayMs = 0
) {
  server.use(
    http[method](route, async () => {
      await delay(delayMs)
      networkCallCount += 1
      return HttpResponse.json(response)
    })
  )
}

function mockEndpointByPayload(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  route: string,
  delayMs = 0
) {
  server.use(
    http[method](route, async ({ request }) => {
      await delay(delayMs)
      networkCallCount += 1
      return HttpResponse.json(await request.json())
    })
  )
}
