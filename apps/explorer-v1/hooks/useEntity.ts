import useSWR from 'swr'
import { apiBase } from '../config'
import { Entity } from '../config/navigatorTypes'

const url = `${apiBase}/hash/`

export function getEntityKey(hash: string) {
  return url + hash
}

export async function fetchEntity(hash: string): Promise<Entity> {
  const response = await fetch(getEntityKey(hash))
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
}

export function useEntity(hash: string) {
  return useSWR<Entity>(getEntityKey(hash), () => fetchEntity(hash), {
    dedupingInterval: 30_000,
  })
}
