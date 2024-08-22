import { useEffect, useRef, useCallback, useMemo } from 'react'
import { GlobeMethods } from 'react-globe.gl'
import { getHostLabel } from './utils'
import { useElementSize } from 'usehooks-ts'
import { useTryUntil } from '@siafoundation/react-core'
import earthDarkContrast from '../../assets/earth-dark-contrast.png'
import earthTopology from '../../assets/earth-topology.png'
import nightSky from '../../assets/night-sky.png'
import { GlobeDyn } from './GlobeDyn'
import { useDecRoutes } from './useRoutes'
import { SiaCentralPartialHost } from '../../content/geoHosts'
import { useExchangeRate } from '@siafoundation/design-system'

export type Commands = {
  moveToLocation: (
    location: [number, number] | undefined,
    altitude?: number
  ) => void
}

export const emptyCommands: Commands = {
  moveToLocation: (location: [number, number], altitude?: number) => null,
}

type Props = {
  activeHost?: SiaCentralPartialHost
  hosts?: SiaCentralPartialHost[]
  onHostClick: (public_key: string, location: [number, number]) => void
  onHostHover: (public_key: string, location: [number, number]) => void
  onMount?: (cmd: Commands) => void
}

type Route = {
  distance: number
  src: SiaCentralPartialHost
  dst: SiaCentralPartialHost
}

export function Globe({
  activeHost,
  hosts,
  onMount,
  onHostClick,
  onHostHover,
}: Props) {
  const exchangeRateUSD = useExchangeRate({
    currency: 'usd',
  })
  const globeEl = useRef<GlobeMethods>(null)
  const cmdRef = useRef<Commands>(emptyCommands)
  const moveToLocation = useCallback(
    (location: [number, number] | undefined, altitude?: number) => {
      if (!location) {
        return
      }
      globeEl.current?.pointOfView(
        {
          lat: location[0] - 8,
          lng: location[1],
          altitude: altitude || 1.5,
        },
        700
      )
    },
    []
  )

  useEffect(() => {
    cmdRef.current.moveToLocation = moveToLocation
  }, [moveToLocation])

  useTryUntil(() => {
    if (!globeEl.current) {
      return false
    }

    moveToLocation(activeHost?.location || [48.8323, 2.4075], 1.5)

    // const directionalLight = globeEl.current
    //   ?.scene()
    //   .children.find((obj3d) => obj3d.type === 'DirectionalLight')
    // if (directionalLight) {
    //   // directionalLight.position.set(1, 1, 1)
    //   directionalLight.intensity = 10
    // }
    return true
  })

  useEffect(() => {
    if (onMount) {
      onMount(cmdRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const routes = useDecRoutes({ hosts, activeHost })

  const [containerRef, { height, width }] = useElementSize()

  const points = useMemo(() => hosts || [], [hosts])

  return (
    <div ref={containerRef} className="w-full h-full">
      <GlobeDyn
        ref={globeEl}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={earthDarkContrast.src}
        bumpImageUrl={earthTopology.src}
        backgroundImageUrl={nightSky.src}
        arcsData={routes}
        atmosphereColor="rgba(0,0,0,0)"
        atmosphereAltitude={0.16}
        animateIn={false}
        arcLabel={(r: Route) =>
          getHostLabel({ host: r.dst, exchangeRateUSD: exchangeRateUSD.rate })
        }
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
            : [`rgba(187, 229, 201, 0.13)`, `rgba(187, 229, 201, 0.13)`]
        }
        // onArcClick={(r: Route) => {
        //   selectActiveHost(r.dst.public_key)
        // }}
        arcsTransitionDuration={0}
        pointsData={points}
        pointLat={(h: SiaCentralPartialHost) => h.location[0]}
        pointLng={(h: SiaCentralPartialHost) => h.location[1]}
        pointLabel={(h: SiaCentralPartialHost) =>
          getHostLabel({ host: h, exchangeRateUSD: exchangeRateUSD.rate })
        }
        // pointAltitude={
        //   (h: SiaCentralPartialHost) => h.settings.remainingstorage / 1e13 / 100
        //   // h.public_key === activeHost.public_key ? 0.6 : 0.2
        // }
        pointAltitude={(h: SiaCentralPartialHost) => {
          let radius = 0
          radius = h.settings.total_storage / 1e15
          return Math.max(radius, 0.005)
        }}
        pointsTransitionDuration={0}
        pointColor={(h: SiaCentralPartialHost) =>
          h.public_key === activeHost.public_key
            ? 'rgba(0,255,0,1)'
            : 'rgba(0,255,0,1)'
        }
        pointRadius={(h: SiaCentralPartialHost) => {
          let radius = 0
          radius = h.settings.total_storage / 1e13 / 3
          return Math.max(radius, 0.2)
        }}
        onPointHover={(h: SiaCentralPartialHost) => {
          if (!h) {
            return
          }
          onHostHover?.(h.public_key, h.location)
        }}
        onPointClick={(h: SiaCentralPartialHost) => {
          if (!h) {
            return
          }
          onHostClick?.(h.public_key, h.location)
        }}
        pointsMerge={false}
      />
    </div>
  )
}

function doesIncludeActiveHost(
  route: Route,
  activeHost?: SiaCentralPartialHost
) {
  if (!activeHost) {
    return false
  }
  return (
    route.dst.public_key === activeHost.public_key ||
    route.src.public_key === activeHost.public_key
  )
}

// function colorWithOpacity(hexColor: string, opacity: number) {
//   const r = parseInt(hexColor.slice(1, 3), 16)
//   const g = parseInt(hexColor.slice(3, 5), 16)
//   const b = parseInt(hexColor.slice(5, 7), 16)

//   return `rgba(${r}, ${g}, ${b}, ${opacity})`
// }
