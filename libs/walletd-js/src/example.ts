import { Walletd } from '.'

export async function example() {
  const walletd = Walletd({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })

  const events = await walletd.walletEvents({
    params: {
      id: 'wallet-1',
      limit: 10,
      offset: 0,
    },
  })
  const peers = await walletd.syncerPeers()
  console.log(events.data, peers.data)
}
