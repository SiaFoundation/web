import { useEffect, useRef, useCallback, useMemo } from 'react'
import { GlobeMethods } from 'react-globe.gl'
import { getHostLabel } from './utils'
import { useElementSize } from 'usehooks-ts'
import { useTryUntil } from '@siafoundation/react-core'
import earthDarkContrast from '../../../assets/earth-dark-contrast.png'
import earthTopology from '../../../assets/earth-topology.png'
import { GlobeDyn } from './GlobeDyn'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import BigNumber from 'bignumber.js'
import { getHostStatus } from '../../../contexts/hosts/status'
import { useActiveDaemonExplorerExchangeRate } from '@siafoundation/design-system'

export type Commands = {
  moveToLocation: (
    location: [number, number] | undefined,
    altitude?: number
  ) => void
}

export const emptyCommands: Commands = {
  moveToLocation: (location: [number, number] | undefined, altitude?: number) =>
    null,
}

type Props = {
  activeHost?: HostDataWithLocation
  hosts?: HostDataWithLocation[]
  onHostClick: (publicKey: string, location: [number, number]) => void
  onHostHover?: (publicKey: string, location: [number, number]) => void
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
  const { currency, rate } = useActiveDaemonExplorerExchangeRate()
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

    moveToLocation(
      activeHost?.location
        ? [activeHost.location.latitude, activeHost.location.longitude]
        : [48.8323, 2.4075],
      1.5
    )

    const directionalLight = globeEl.current
      ?.scene()
      .children.find(
        (obj3d: { type: string }) => obj3d.type === 'DirectionalLight'
      )
    if (directionalLight) {
      // directionalLight.position.set(1, 1, 1)
      directionalLight.intensity = 10
    }
    return true
  })

  useEffect(() => {
    if (onMount) {
      onMount(cmdRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const routes = useDecRoutes({ hosts, activeHost })
  const routes: never[] = []

  const [containerRef, { height, width }] = useElementSize()

  const points = useMemo(() => hosts || [], [hosts])

  return (
    <div ref={containerRef} className="w-full h-full">
      <GlobeDyn
        ref={globeEl}
        // @ts-expect-error: This prop is required but the typing is lost in the wrapping.
        // Revisit if we ever update this feature.
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
        arcLabel={(r: Route) => getHostLabel({ host: r.dst, currency, rate })}
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
        // onArcClick={(r: Route) => {
        //   selectActiveHost(r.dst.publicKey)
        // }}
        arcsTransitionDuration={0}
        pointsData={points}
        pointLat={(h: HostDataWithLocation) => h.location.latitude}
        pointLng={(h: HostDataWithLocation) => h.location.longitude}
        pointLabel={(h: HostDataWithLocation) =>
          getHostLabel({ host: h, currency, rate })
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
          onHostHover?.(h.publicKey, [
            h.location.latitude,
            h.location.longitude,
          ])
        }}
        onPointClick={(h: HostDataWithLocation) => {
          if (!h) {
            return
          }
          onHostClick?.(h.publicKey, [
            h.location.latitude,
            h.location.longitude,
          ])
        }}
        pointsMerge={false}
      />
    </div>
  )
}

function doesIncludeActiveHost(
  route: Route,
  activeHost?: HostDataWithLocation
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
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
