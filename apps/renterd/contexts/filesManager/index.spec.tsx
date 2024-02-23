import { render, act, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { NextAppCsr } from '@siafoundation/design-system'
import { FilesManagerProvider, useFilesManager, FilesManagerState } from '.'
import { useEffect } from 'react'
import {
  mockApiBusBuckets,
  mockApiBusSettingRedundancy,
  mockMatchMedia,
} from '../../mock/mock'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { usePathname, useAppRouter } = require('@siafoundation/next')

// NOTE: Update to use a functional test router after migrating to vitest.
jest.mock('@siafoundation/next', () => {
  const push = jest.fn()
  return {
    useAppRouter: jest.fn().mockReturnValue({
      query: {},
      push,
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
  mockApiBusSettingRedundancy(server)
  server.listen()
})
beforeEach(() => {
  localStorage.clear()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('filesManager', () => {
  it('directory mode navigates to directory with file filter', async () => {
    useAppRouter.mockClear()
    usePathname.mockReturnValue('/files/default/foo/bar/baz')
    const context = mountProvider()
    const {
      activeExplorerMode,
      fileNamePrefixFilter,
      navigateToModeSpecificFiltering,
    } = context.state
    expect(activeExplorerMode).toBe('directory')
    act(() => {
      navigateToModeSpecificFiltering('/default/photos/cats')
    })
    waitFor(() => {
      const lastPushCallParams = getLastRouterPushCallParams()
      expect(lastPushCallParams[0]).toBe('/files/default/photos')
      expect(fileNamePrefixFilter).toBe('cats')
    })
  })
  it('toggling to flat explorer mode applies the active directory as a filter', async () => {
    useAppRouter.mockClear()
    usePathname.mockReturnValue('/files/default/foo/bar/baz')
    const context = mountProvider()
    expect(context.state.activeExplorerMode).toBe('directory')
    act(() => {
      context.state.setExplorerModeFlat()
    })
    waitFor(() => {
      expect(context.state.activeExplorerMode).toBe('flat')
      const lastPushCallParams = getLastRouterPushCallParams()
      expect(lastPushCallParams[0]).toBe('/files/default')
      expect(context.state.fileNamePrefixFilter).toBe('/foo/bar/baz')
    })
  })
  it('toggling from flat mode to directory clears the file filter', async () => {
    useAppRouter.mockClear()
    usePathname.mockReturnValue('/files/foo/bar/baz')
    const context = mountProvider()
    act(() => {
      context.state.setExplorerModeFlat()
    })
    waitFor(() => {
      expect(context.state.activeExplorerMode).toBe('flat')
      expect(context.state.fileNamePrefixFilter).toBe('/foo/bar/baz')
    })
    act(() => {
      context.state.setExplorerModeDirectory()
    })
    waitFor(() => {
      expect(context.state.activeExplorerMode).toBe('directory')
      const lastPushCallParams = getLastRouterPushCallParams()
      expect(lastPushCallParams[0]).toBe('/files/default')
      expect(context.state.fileNamePrefixFilter).toBe('cats')
    })
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
  const onContext = (c) => {
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

function getLastRouterPushCallParams() {
  const mockPush = useAppRouter.mock.results.slice(-1)[0]
  const lastPushCallParams = mockPush?.value.push.mock.calls.slice(-1)[0]
  return lastPushCallParams
}
