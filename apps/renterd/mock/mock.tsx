import type { Bucket, RedundancySettings } from '@siafoundation/renterd-types'
import { http, HttpResponse } from 'msw'
import type { SetupServer } from 'msw/node'
import { vi } from 'vitest'

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

export function mockApiBusSettingRedundancy(server: SetupServer) {
  server.use(
    http.get('/api/bus/setting/redundancy', () => {
      return HttpResponse.json({
        minShards: 10,
        totalShards: 30,
      } as RedundancySettings)
    }),
  )
}

export function mockMatchMedia() {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}
