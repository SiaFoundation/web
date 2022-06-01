import useSWR from 'swr'
import { apiBase } from '../config'
import { AddressUtxos } from '../config/types'

const url = `${apiBase}/unspent_outputs/`

export function useUtxos(address?: string) {
  return useSWR<AddressUtxos>(
    address ? ['outputs', address] : null,
    async () => {
      const response = await fetch(url + address)
      const data = await response.json()
      return data
    },
    {
      dedupingInterval: 60_000,
    }
  )
}
