import { WebTransportClient } from './transport'

export async function example() {
  const client = new WebTransportClient(
    'wss://your-webtransport-server.example',
    'cert',
  )
  await client.connect()
  const response = await client.sendRPCSettingsRequest()
  console.log('Settings:', response)
}
