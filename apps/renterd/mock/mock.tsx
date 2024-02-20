import { SetupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { Bucket } from '@siafoundation/react-renterd'

export function mockApiBusBuckets(server: SetupServer) {
  server.use(
    http.get('/api/bus/buckets', () => {
      return HttpResponse.json([
        {
          name: 'foo',
          policy: {
            publicReadAccess: true,
          },
        },
      ] as Bucket[])
    })
  )
}

export function mockMatchMedia() {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
}
