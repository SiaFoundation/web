import {
  useEffect,
  useRef,
  memo,
  forwardRef,
  MutableRefObject,
  useMemo,
  useCallback,
} from 'react'
import dynamic from 'next/dynamic'
import { GlobeMethods } from 'react-globe.gl'
import { random, sortBy } from '@technically/lodash'
import { getHostLabel } from './utils'
import { getAssetUrl } from '../../content/assets'
import { useTheme } from 'next-themes'
import { useElementSize } from 'usehooks-ts'
import { ExplorerPartialHost } from '../../content/geoHosts'
import { useSiascanExchangeRate } from '@siafoundation/design-system'

type Props = {
  activeHost?: ExplorerPartialHost
  selectActiveHost: (public_key: string) => void
  hosts: ExplorerPartialHost[]
}

type Route = {
  distance: number
  src: ExplorerPartialHost
  dst: ExplorerPartialHost
}

const GlobeGl = dynamic(() => import('./GlobeGl'), {
  ssr: false,
})

const ReactGlobe = forwardRef(function ReactGlobe(
  props: Omit<React.ComponentProps<typeof GlobeGl>, 'forwardRef'>,
  ref: MutableRefObject<GlobeMethods>
) {
  return <GlobeGl {...props} forwardRef={ref} />
})

function GlobeComponent({ activeHost, hosts, selectActiveHost }: Props) {
  const { rate: rateUsd } = useSiascanExchangeRate({
    currency: 'usd',
  })
  const globeEl = useRef<GlobeMethods>(null)
  const moveToHost = useCallback((host: ExplorerPartialHost) => {
    globeEl.current?.pointOfView(
      {
        lat: host.location.latitude - 8,
        lng: host.location.longitude,
        altitude: 2,
      },
      700
    )
  }, [])

  const moveToActiveHost = useCallback(() => {
    if (activeHost) {
      moveToHost(activeHost)
    }
  }, [moveToHost, activeHost])

  useEffect(() => {
    moveToActiveHost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHost])

  useEffect(() => {
    setTimeout(() => {
      if (globeEl.current) {
        globeEl.current.controls().enableZoom = false
      }
      moveToActiveHost()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const backgroundRoutes = useMemo(() => {
    const routes: Route[] = []
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
    if (!activeHost) {
      return []
    }
    let routes: Route[] = []
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

  const { resolvedTheme } = useTheme()
  const [containerRef, { width: size }] = useElementSize()

  return (
    <div ref={containerRef}>
      <ReactGlobe
        ref={globeEl}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={`/_next/image?url=${encodeURIComponent(
          getAssetUrl('assets/map.png')
        )}&w=2048&q=50`}
        bumpImageUrl={`/_next/image?url=${encodeURIComponent(
          getAssetUrl('assets/earth-topology.png')
        )}&w=2048&q=70`}
        arcsData={routes}
        atmosphereColor="rgba(30, 169,76, 1)"
        atmosphereAltitude={resolvedTheme === 'dark' ? 0.05 : 0.15}
        animateIn={false}
        arcLabel={(r: Route) => getHostLabel({ host: r.dst, rateUsd })}
        arcStartLat={(r: Route) => +r.src.location.latitude}
        arcStartLng={(r: Route) => +r.src.location.longitude}
        arcEndLat={(r: Route) => +r.dst.location.latitude}
        arcEndLng={(r: Route) => +r.dst.location.longitude}
        arcDashLength={0.75}
        arcAltitude={0}
        arcDashGap={0.1}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={5000}
        // arcDashAnimateTime={(route: Route) =>
        //   doesIncludeActiveHost(route, activeHost) ? 5000 : 0
        // }
        arcColor={(r: Route) =>
          doesIncludeActiveHost(r, activeHost)
            ? [`rgba(187, 229, 201, 0.25)`, `rgba(187, 229, 201, 0.25)`]
            : [`rgba(187, 229, 201, 0.10)`, `rgba(187, 229, 201, 0.10)`]
        }
        onArcClick={(r: Route) => {
          selectActiveHost(r.dst.publicKey)
        }}
        arcsTransitionDuration={0}
        pointsData={hosts}
        pointLat={(h: ExplorerPartialHost) => h.location.latitude}
        pointLng={(h: ExplorerPartialHost) => h.location.longitude}
        pointLabel={(h: ExplorerPartialHost) =>
          getHostLabel({ host: h, rateUsd })
        }
        pointAltitude={0}
        pointColor={(h: ExplorerPartialHost) =>
          h.publicKey === activeHost?.publicKey
            ? 'rgba(0,255,0,1)'
            : 'rgba(0,255,0,1)'
        }
        pointRadius={(h: ExplorerPartialHost) =>
          h.publicKey === activeHost?.publicKey ? 0.6 : 0.2
        }
        onPointClick={(h: ExplorerPartialHost) => {
          selectActiveHost(h.publicKey)
        }}
        pointsMerge={false}
      />
    </div>
  )
}

export const Globe = memo(GlobeComponent)

function distanceBetweenHosts(
  h1: ExplorerPartialHost,
  h2: ExplorerPartialHost
) {
  return Math.sqrt(
    Math.pow(h1.location.latitude - h2.location.latitude, 2) +
      Math.pow(h1.location.longitude - h2.location.longitude, 2)
  )
}

function doesIncludeActiveHost(route: Route, activeHost?: ExplorerPartialHost) {
  if (!activeHost) {
    return false
  }
  return (
    route.dst.publicKey === activeHost.publicKey ||
    route.src.publicKey === activeHost.publicKey
  )
}
