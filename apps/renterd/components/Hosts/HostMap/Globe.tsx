import { useTryUntil } from '@siafoundation/react-core'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import type { GlobeMethods } from 'react-globe.gl'
import { useElementSize } from 'usehooks-ts'
import earthDarkContrast from '../../../assets/earth-dark-contrast.png'
import earthTopology from '../../../assets/earth-topology.png'
import { getHostStatus } from '../../../contexts/hosts/status'
import type { HostDataWithLocation } from '../../../contexts/hosts/types'
import { GlobeDyn } from './GlobeDyn'
import { getHostLabel } from './utils'

export type Commands = {
  moveToLocation: (
    location: [number, number] | undefined,
    altitude?: number,
  ) => void
}

export const emptyCommands: Commands = {
  moveToLocation: () => null,
}

type Props = {
  activeHost?: HostDataWithLocation
  hosts?: HostDataWithLocation[]
  onHostClick: (publicKey: string, location: [number, number]) => void
  onHostHover: (publicKey: string, location: [number, number]) => void
  onMount?: (cmd: Commands) => void
}

type Route = {
  distance: number
  src: HostDataWithLocation
  dst: HostDataWithLocation
}

export function Globe({
  activeHost,
  hosts,
  onMount,
  onHostClick,
  onHostHover,
}: Props) {
  const rates = useSiaCentralExchangeRates({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
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
        700,
      )
    },
    [],
  )

  useEffect(() => {
    cmdRef.current.moveToLocation = moveToLocation
  }, [moveToLocation])

  useTryUntil(() => {
    if (!globeEl.current) {
      return false
    }

    moveToLocation(activeHost?.location || [48.8323, 2.4075], 1.5)

    const directionalLight = globeEl.current
      ?.scene()
      .children.find(
        (obj3d: { type: string }) => obj3d.type === 'DirectionalLight',
      )
    if (directionalLight) {
      // directionalLight.position.set(1, 1, 1)
      directionalLight.intensity = 10
    }
    return true
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (onMount) {
      onMount(cmdRef.current)
    }
  }, [])

  // const routes = useDecRoutes({ hosts, activeHost })
  const routes: unknown[] = []

  const [containerRef, { height, width }] = useElementSize()

  const points = useMemo(() => hosts || [], [hosts])

  return (
    <div ref={containerRef} className="w-full h-full">
      <GlobeDyn
        ref={globeEl}
        // @ts-expect-error - revisit whether this prop is necessary
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={earthDarkContrast.src}
        bumpImageUrl={earthTopology.src}
        // backgroundImageUrl={nightSky.src}
        arcsData={routes}
        atmosphereColor="rgba(0,0,0,0)"
        atmosphereAltitude={0.16}
        animateIn={false}
        arcLabel={(r: Route) =>
          getHostLabel({ host: r.dst, rates: rates.data?.rates.sc })
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
            : [`rgba(187, 229, 201, 0.10)`, `rgba(187, 229, 201, 0.10)`]
        }
        // onArcClick={(r: Route) => {
        //   selectActiveHost(r.dst.publicKey)
        // }}
        arcsTransitionDuration={0}
        pointsData={points}
        pointLat={(h: HostDataWithLocation) => h.location[0]}
        pointLng={(h: HostDataWithLocation) => h.location[1]}
        pointLabel={(h: HostDataWithLocation) =>
          getHostLabel({ host: h, rates: rates.data?.rates.sc })
        }
        // pointAltitude={
        //   (h: HostDataWithLocation) => h.settings.remainingstorage / 1e13 / 100
        //   // h.publicKey === activeHost.publicKey ? 0.6 : 0.2
        // }
        pointAltitude={(h: HostDataWithLocation) => {
          if (activeHost) {
            return h.publicKey === activeHost?.publicKey
              ? 0.1
              : h.activeContractsCount.gt(0)
                ? 0.1
                : 0.1
          }
          return h.activeContractsCount.gt(0) ? 0.1 : 0.1
        }}
        pointsTransitionDuration={0}
        pointColor={(h: HostDataWithLocation) => {
          const { colorHex } = getHostStatus(h)
          if (!activeHost || h.publicKey === activeHost?.publicKey) {
            return colorHex
          }
          return colorWithOpacity(colorHex, 0.2)
        }}
        pointRadius={(h: HostDataWithLocation) => {
          let radius = 0
          if (h.activeContractsCount.gt(0)) {
            radius = h.activeContracts
              .reduce((acc, c) => acc.plus(c.size), new BigNumber(0))
              .div(1e12)
              .toNumber()
          }
          radius = (h.settings?.remainingstorage || 0) / 1e13 / 3

          return Math.max(radius, 0.1)
        }}
        onPointHover={(h: HostDataWithLocation) => {
          if (!h) {
            return
          }
          onHostHover?.(h.publicKey, h.location)
        }}
        onPointClick={(h: HostDataWithLocation) => {
          if (!h) {
            return
          }
          onHostClick?.(h.publicKey, h.location)
        }}
        pointsMerge={false}
      />
    </div>
  )
}

function doesIncludeActiveHost(
  route: Route,
  activeHost?: HostDataWithLocation,
) {
  if (!activeHost) {
    return false
  }
  return (
    route.dst.publicKey === activeHost.publicKey ||
    route.src.publicKey === activeHost.publicKey
  )
}

function colorWithOpacity(hexColor: string, opacity: number) {
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
