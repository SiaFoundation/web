import { render, act } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { NextAppCsr } from '@siafoundation/design-system'
import { FilesManagerProvider, useFilesManager, FilesManagerState } from '.'
import { useEffect } from 'react'
import {
  mockApiBusBuckets,
  mockApiBusSettingsUpload,
  mockMatchMedia,
} from '../../mock/mock'

const { usePathname, useAppRouter, useParams } = require('@siafoundation/next')

// NOTE: Update to use a functional test router after migrating to vitest.
jest.mock('@siafoundation/next', () => {
  return {
    useAppRouter: jest.fn().mockReturnValue({
      query: {},
      push: jest.fn(),
    }),
    useParams: jest.fn().mockReturnValue({ path: [] }),
    usePathname: jest.fn().mockReturnValue('/files'),
    useSearchParams: jest.fn().mockReturnValue({}),
  }
})

const server = setupServer()
beforeAll(() => {
  mockMatchMedia()
  mockApiBusBuckets(server)
  mockApiBusSettingsUpload(server)
  server.listen()
})
beforeEach(() => {
  jest.clearAllMocks()
  localStorage.clear()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('filesManager', () => {
  it('directory mode navigates to directory with file filter', async () => {
    useAppRouter.mockClear()
    useParams.mockReturnValue({
      bucket: 'default',
      path: ['foo', 'bar', 'baz'],
    })
    usePathname.mockReturnValue('/buckets/default/files/foo/bar/baz')
    const context = mountProvider()
    expect(context.state?.activeExplorerMode).toBe('directory')
    act(() => {
      context.state?.navigateToModeSpecificFiltering('/default/photos/cats')
    })
    const lastPushCallParams = getLastRouterPushCallParams()
    expect(lastPushCallParams[0]).toBe('/buckets/default/files/photos')
    expect(context.state?.fileNamePrefixFilter).toBe('cats')
  })
  it('toggling to flat explorer mode applies the active directory as a filter', async () => {
    useAppRouter.mockClear()
    useParams.mockReturnValue({
      bucket: 'default',
      path: ['foo', 'bar', 'baz'],
    })
    usePathname.mockReturnValue('/buckets/default/files/foo/bar/baz')
    const context = mountProvider()
    expect(context.state?.activeExplorerMode).toBe('directory')
    act(() => {
      context.state?.setExplorerModeFlat()
    })
    expect(context.state?.activeExplorerMode).toBe('flat')
    const lastPushCallParams = getLastRouterPushCallParams()
    expect(lastPushCallParams[0]).toBe('/buckets/default/files/')
    expect(context.state?.fileNamePrefixFilter).toBe('foo/bar/baz/')
  })
  it('toggling from flat mode to directory clears the file filter', async () => {
    useAppRouter.mockClear()
    useParams.mockReturnValue({
      bucket: 'default',
      path: ['foo', 'bar', 'baz'],
    })
    usePathname.mockReturnValue('/buckets/default/files/foo/bar/baz')
    const context = mountProvider()
    act(() => {
      context.state?.setExplorerModeFlat()
    })
    expect(context.state?.activeExplorerMode).toBe('flat')
    expect(context.state?.fileNamePrefixFilter).toBe('foo/bar/baz/')
    act(() => {
      context.state?.setExplorerModeDirectory()
    })
    expect(context.state?.activeExplorerMode).toBe('directory')
    const lastPushCallParams = getLastRouterPushCallParams()
    expect(lastPushCallParams[0]).toBe('/buckets/default/files/')
    expect(context.state?.fileNamePrefixFilter).toBe('')
  })
  it('does not routes if mode already active', async () => {
    useAppRouter.mockClear()
    useParams.mockReturnValue({
      bucket: 'default',
      path: [],
    })
    usePathname.mockReturnValue('/buckets/default/files')
    const context = mountProvider()
    act(() => {
      context.state?.setExplorerModeDirectory()
    })
    expect(context.state?.activeExplorerMode).toBe('directory')
    const pushCount = getRouterPushCallCount()
    expect(pushCount).toBe(0)
    expect(context.state?.fileNamePrefixFilter).toBe('')
  })
  it('routes to active mode if viewing uploads', async () => {
    useAppRouter.mockClear()
    useParams.mockReturnValue({
      bucket: 'default',
    })
    usePathname.mockReturnValue('/buckets/default/uploads')
    const context = mountProvider()
    act(() => {
      context.state?.setExplorerModeDirectory()
    })
    expect(context.state?.activeExplorerMode).toBe('directory')
    const lastPushCallParams = getLastRouterPushCallParams()
    expect(lastPushCallParams[0]).toBe('/buckets/default/files/')
    expect(context.state?.fileNamePrefixFilter).toBe('')
  })
})

function ContextConsumer({
  onContext,
}: {
  onContext: (context: FilesManagerState) => void
}) {
  const contextValues = useFilesManager()

  useEffect(() => {
    onContext(contextValues)
  }, [contextValues, onContext])

  return null
}

function mountProvider() {
  const context: { state?: FilesManagerState } = {}
  const onContext = (c: FilesManagerState) => {
    context.state = c
  }
  render(
    <NextAppCsr>
      <FilesManagerProvider>
        <ContextConsumer onContext={onContext} />
      </FilesManagerProvider>
    </NextAppCsr>
  )
  return context
}

function getRouterPushCallCount() {
  const mockPush = useAppRouter.mock.results.slice(-1)[0]
  return mockPush?.value.push.mock.calls.length
}

function getLastRouterPushCallParams() {
  const mockPush = useAppRouter.mock.results.slice(-1)[0]
  const lastPushCallParams = mockPush?.value.push.mock.calls.slice(-1)[0]
  return lastPushCallParams
}
