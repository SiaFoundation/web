import { useMemo } from 'react'
import random from 'lodash-es/random'
import sortBy from 'lodash-es/sortBy'
import { HostDataWithLocation } from '../../../contexts/hosts/types'

type Props = {
  activeHost?: HostDataWithLocation
  hosts?: HostDataWithLocation[]
}

type Route = {
  distance: number
  src: HostDataWithLocation
  dst: HostDataWithLocation
}

export function useDecRoutes({ activeHost, hosts }: Props) {
  const backgroundRoutes = useMemo(() => {
    const routes: Route[] = []
    if (!hosts) {
      return routes
    }
    for (let i = 0; i < hosts.length; i++) {
      const host1 = hosts[i]
      let hostRoutes: Route[] = []
      for (let j = 0; j < hosts.length; j++) {
        if (i === j) {
          continue
        }
        const host2 = hosts[j]
        const distance = distanceBetweenHosts(host1, host2)
        hostRoutes.push({
          distance,
          src: host1,
          dst: host2,
        })
      }
      hostRoutes = sortBy(hostRoutes, 'distance')
      const closest = hostRoutes.slice(4, 6)
      routes.push(...closest)

      const addExtra = Math.random() < 0.1
      if (addExtra) {
        const randomDistantIndex = random(
          // Math.round((hostRoutes.length - 1) / 2),
          0,
          hostRoutes.length - 1
        )
        const extra = hostRoutes[randomDistantIndex]
        routes.push(extra)
      }
    }
    return routes
  }, [hosts])

  const activeRoutes = useMemo(() => {
    let routes: Route[] = []
    if (!hosts || !activeHost) {
      return routes
    }
    for (let i = 0; i < hosts.length; i++) {
      const host = hosts[i]
      if (activeHost.publicKey === host.publicKey) {
        continue
      }
      const distance = distanceBetweenHosts(activeHost, host)
      routes.push({
        distance,
        src: activeHost,
        dst: host,
      })
    }
    routes = sortBy(routes, 'distance')
    return routes.slice(0, 5)
  }, [activeHost, hosts])

  const routes = useMemo(
    () => [...backgroundRoutes, ...activeRoutes],
    [backgroundRoutes, activeRoutes]
  )

  return routes
}

function distanceBetweenHosts(
  h1: HostDataWithLocation,
  h2: HostDataWithLocation
) {
  return Math.sqrt(
    Math.pow(h1.location[0] - h2.location[0], 2) +
      Math.pow(h1.location[1] - h2.location[1], 2)
  )
}
