import { SetupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { Bucket, SettingsUpload } from '@siafoundation/renterd-types'

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
    }),
  )
}

export function mockApiBusSettingsUpload(server: SetupServer) {
  server.use(
    http.get('/api/bus/settings/upload', () => {
      return HttpResponse.json({
        packing: {
          enabled: true,
          slabBufferMaxSizeSoft: 1,
        },
        redundancy: {
          minShards: 10,
          totalShards: 30,
        },
      } as SettingsUpload)
    }),
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
