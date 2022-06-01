import useSWR from 'swr'
import { apiBase } from '../config'
import { Entity } from '../config/types'

const url = `${apiBase}/hash/`

export function useEntity(hash: string) {
  return useSWR<Entity>(
    hash,
    async () => {
      const response = await fetch(url + hash)
      const data = await response.json()
      if (data?.length) {
        return {
          type: data[0].Type,
          data,
        }
      }
      return {
        type: 'error',
        data: [],
      }
    },
    {
      dedupingInterval: 30_000,
    }
  )
}
