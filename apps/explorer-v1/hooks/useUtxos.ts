import useSWR from 'swr'
import { apiBase } from '../config'
import { AddressUtxos } from '../config/types'

function getUtxosKey(address?: string) {
  return address ? `${apiBase}/unspent_outputs/${address}` : null
}

async function fetchUtxos(address: string) {
  const response = await fetch(getUtxosKey(address))
  const data = await response.json()
  return data
}

export function useUtxos(address?: string) {
  return useSWR<AddressUtxos>(getUtxosKey(address), () => fetchUtxos(address), {
    dedupingInterval: 60_000,
  })
}
