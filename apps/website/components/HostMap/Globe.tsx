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
import { SiaCentralPartialHost } from '../../content/geoHosts'
import { getAssetUrl } from '../../content/assets'
import { useTheme } from 'next-themes'
import { useElementSize } from 'usehooks-ts'

type Props = {
  activeHost: SiaCentralPartialHost
  selectActiveHost: (public_key: string) => void
  hosts: SiaCentralPartialHost[]
  rates: {
    usd: string
  }
}

type Route = {
  distance: number
  src: SiaCentralPartialHost
  dst: SiaCentralPartialHost
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

function GlobeComponent({ activeHost, hosts, rates, selectActiveHost }: Props) {
  const globeEl = useRef<GlobeMethods>(null)
  const moveToHost = useCallback((host: SiaCentralPartialHost) => {
    globeEl.current?.pointOfView(
      {
        lat: host.location[0] - 8,
        lng: host.location[1],
        altitude: 2,
      },
      700
    )
  }, [])

  const moveToActiveHost = useCallback(() => {
    moveToHost(activeHost)
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
    let routes: Route[] = []
    for (let i = 0; i < hosts.length; i++) {
      const host = hosts[i]
      if (activeHost.public_key === host.public_key) {
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
        arcLabel={(r: Route) => getHostLabel({ host: r.dst, rates })}
        arcStartLat={(r: Route) => +r.src.location[0]}
        arcStartLng={(r: Route) => +r.src.location[1]}
        arcEndLat={(r: Route) => +r.dst.location[0]}
        arcEndLng={(r: Route) => +r.dst.location[1]}
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
          selectActiveHost(r.dst.public_key)
        }}
        arcsTransitionDuration={0}
        pointsData={hosts}
        pointLat={(h: SiaCentralPartialHost) => h.location[0]}
        pointLng={(h: SiaCentralPartialHost) => h.location[1]}
        pointLabel={(h: SiaCentralPartialHost) =>
          getHostLabel({ host: h, rates })
        }
        pointAltitude={0}
        pointColor={(h: SiaCentralPartialHost) =>
          h.public_key === activeHost.public_key
            ? 'rgba(0,255,0,1)'
            : 'rgba(0,255,0,1)'
        }
        pointRadius={(h: SiaCentralPartialHost) =>
          h.public_key === activeHost.public_key ? 0.6 : 0.2
        }
        onPointClick={(h: SiaCentralPartialHost) => {
          selectActiveHost(h.public_key)
        }}
        pointsMerge={false}
      />
    </div>
  )
}

export const Globe = memo(GlobeComponent)

function distanceBetweenHosts(
  h1: SiaCentralPartialHost,
  h2: SiaCentralPartialHost
) {
  return Math.sqrt(
    Math.pow(h1.location[0] - h2.location[0], 2) +
      Math.pow(h1.location[1] - h2.location[1], 2)
  )
}

function doesIncludeActiveHost(
  route: Route,
  activeHost: SiaCentralPartialHost
) {
  return (
    route.dst.public_key === activeHost.public_key ||
    route.src.public_key === activeHost.public_key
  )
}
