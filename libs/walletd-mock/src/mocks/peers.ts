import { SyncerPeersResponse } from '@siafoundation/walletd-react'
import { Page } from 'playwright'

export function getMockPeersResponse(): SyncerPeersResponse {
  return [
    {
      addr: '51.81.242.140:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T17:14:43Z',
      connectedSince: '2024-03-25T21:08:49Z',
      syncDuration: 1321006459,
    },
    {
      addr: '3.36.68.121:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T13:39:10Z',
      connectedSince: '2024-03-25T21:08:50Z',
      syncDuration: 4230014834,
    },
    {
      addr: '185.200.116.131:9807',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T17:14:43Z',
      connectedSince: '2024-03-25T21:08:51Z',
      syncedBlocks: 2,
      syncDuration: 6018991169,
    },
    {
      addr: '62.30.63.90:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T13:39:10Z',
      connectedSince: '2024-03-25T21:09:07Z',
      syncDuration: 6341708209,
    },
    {
      addr: '43.203.121.70:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T17:14:44Z',
      connectedSince: '2024-03-25T21:09:08Z',
      syncedBlocks: 3,
      syncDuration: 6860545337,
    },
    {
      addr: '23.239.8.40:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T13:39:10Z',
      connectedSince: '2024-03-25T21:09:08Z',
      syncDuration: 580416082,
    },
    {
      addr: '141.94.161.198:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T13:39:10Z',
      connectedSince: '2024-03-25T21:09:13Z',
      syncedBlocks: 93,
      syncDuration: 4894896166,
    },
    {
      addr: '64.227.180.244:9881',
      inbound: false,
      version: '1.5.4',
      firstSeen: '2024-03-20T13:39:25Z',
      connectedSince: '2024-03-25T21:08:49Z',
      syncedBlocks: 2,
      syncDuration: 4687705000,
    },
  ]
}

export async function mockApiSyncerPeers({ page }: { page: Page }) {
  const json = getMockPeersResponse()
  await page.route('**/api/syncer/peers*', async (route) => {
    await route.fulfill({ json })
  })
  return json
}
