'use client'

import { useEffect, useRef, useCallback, useMemo, RefObject } from 'react'
import { GlobeMethods } from 'react-globe.gl'
import { getHostLabel } from './utils'
import { useResizeObserver } from 'usehooks-ts'
import { useTryUntil } from '@siafoundation/react-core'
import { useExternalExchangeRate } from '@siafoundation/design-system'
import earthDarkContrast from './assets/earth-dark-contrast.png'
import earthTopology from './assets/earth-topology.png'
import nightSky from './assets/night-sky.png'
import { GlobeDyn } from './GlobeDyn'
import { useDecRoutes } from './useRoutes'
import { ExplorerPartialHost } from './types'

export type Commands = {
  moveToLocation: (
    location: [number, number] | undefined,
    altitude?: number,
  ) => void
}

export const emptyCommands: Commands = {
  moveToLocation: (location: [number, number] | undefined, altitude?: number) =>
    null,
}

type Props = {
  activeHost?: ExplorerPartialHost
  hosts?: ExplorerPartialHost[]
  onHostClick: (public_key: string, location: [number, number]) => void
  onHostHover: (public_key: string, location: [number, number]) => void
  onMount?: (cmd: Commands) => void
}

type Route = {
  distance: number
  src: ExplorerPartialHost
  dst: ExplorerPartialHost
}

export function Globe({
  activeHost,
  hosts,
  onMount,
  onHostClick,
  onHostHover,
}: Props) {
  const exchangeRateUSD = useExternalExchangeRate({
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

    moveToLocation(
      activeHost?.location
        ? [activeHost.location.latitude, activeHost.location.longitude]
        : [48.8323, 2.4075],
      1.5,
    )

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

  const containerRef = useRef<HTMLDivElement>(null)
  const { height, width } = useResizeObserver({
    ref: containerRef as RefObject<HTMLDivElement>,
  })

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
        arcLabel={(obj: object) =>
          getHostLabel({
            host: (obj as Route).dst,
            exchangeRateUSD: exchangeRateUSD.rate,
          })
        }
        arcStartLat={(obj: object) => +(obj as Route).src.location.latitude}
        arcStartLng={(obj: object) => +(obj as Route).src.location.longitude}
        arcEndLat={(obj: object) => +(obj as Route).dst.location.latitude}
        arcEndLng={(obj: object) => +(obj as Route).dst.location.longitude}
        arcDashLength={0.75}
        arcAltitude={0}
        arcDashGap={0.1}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={5000}
        // arcDashAnimateTime={(obj: object) =>
        //   doesIncludeActiveHost(obj as Route, activeHost) ? 5000 : 0
        // }
        arcColor={(obj: object) =>
          doesIncludeActiveHost(obj as Route, activeHost)
            ? [`rgba(187, 229, 201, 0.25)`, `rgba(187, 229, 201, 0.25)`]
            : [`rgba(187, 229, 201, 0.13)`, `rgba(187, 229, 201, 0.13)`]
        }
        // onArcClick={(r: Route) => {
        //   selectActiveHost(r.dst.publicKey)
        // }}
        arcsTransitionDuration={0}
        pointsData={points}
        pointLat={(obj: object) =>
          (obj as ExplorerPartialHost).location.latitude
        }
        pointLng={(obj: object) =>
          (obj as ExplorerPartialHost).location.longitude
        }
        pointLabel={(obj: object) =>
          getHostLabel({
            host: obj as ExplorerPartialHost,
            exchangeRateUSD: exchangeRateUSD.rate,
          })
        }
        // pointAltitude={
        //   (obj: object) => (obj as ExplorerPartialHost).settings.remainingstorage / 1e13 / 100
        //   // h.publicKey === activeHost.publicKey ? 0.6 : 0.2
        // }
        pointAltitude={(obj: object) => {
          const h = obj as ExplorerPartialHost
          let radius = 0
          radius = h.totalStorage / 1e15
          const minSize = 0.005
          const maxSize = 0.1
          return Math.min(Math.max(radius, minSize), maxSize)
        }}
        pointsTransitionDuration={0}
        pointColor={(obj: object) => {
          const h = obj as ExplorerPartialHost
          return h.publicKey === activeHost?.publicKey
            ? 'rgba(0,255,0,1)'
            : 'rgba(0,255,0,1)'
        }}
        pointRadius={(obj: object) => {
          const h = obj as ExplorerPartialHost
          let radius = 0
          radius = h.totalStorage / 1e13 / 3
          const minSize = 0.2
          const maxSize = 2
          return Math.min(Math.max(radius, minSize), maxSize)
        }}
        onPointHover={(point: object | null) => {
          if (!point) {
            return
          }
          const h = point as ExplorerPartialHost
          onHostHover?.(h.publicKey, [
            h.location.latitude,
            h.location.longitude,
          ])
        }}
        onPointClick={(point: object) => {
          if (!point) {
            return
          }
          const h = point as ExplorerPartialHost
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

function doesIncludeActiveHost(route: Route, activeHost?: ExplorerPartialHost) {
  if (!activeHost) {
    return false
  }
  return (
    route.dst.publicKey === activeHost.publicKey ||
    route.src.publicKey === activeHost.publicKey
  )
}

// function colorWithOpacity(hexColor: string, opacity: number) {
//   const r = parseInt(hexColor.slice(1, 3), 16)
//   const g = parseInt(hexColor.slice(3, 5), 16)
//   const b = parseInt(hexColor.slice(5, 7), 16)

//   return `rgba(${r}, ${g}, ${b}, ${opacity})`
// }
