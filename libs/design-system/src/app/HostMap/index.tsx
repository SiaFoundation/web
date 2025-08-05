'use client'

import { useState, useEffect } from 'react'
import { Tooltip } from '../../core/Tooltip'
import { useExternalActiveExchangeRate } from '../../hooks/useExternalExchangeRate'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { getHostLabel, getHostColor } from './utils'
import { HostMapHost } from './types'
import { cn } from '../../lib/ui'

export type { HostMapHost }

export function HostMap({
  hosts,
  activeHost,
  onHostMapClick,
  scale = 220,
  className,
  mapClassName,
}: {
  hosts: HostMapHost[]
  activeHost: HostMapHost | null
  onHostMapClick: (hostId: string, coordinates: [number, number]) => void
  scale?: number
  className?: string
  mapClassName?: string
}) {
  const { currency, rate } = useExternalActiveExchangeRate()
  const [geographyData, setGeographyData] = useState<
    Record<string, unknown> | undefined
  >(undefined)

  useEffect(() => {
    import('./countries-110m.json').then((data) => {
      setGeographyData(data.default)
    })
  }, [])

  return (
    <div className={cn('relative', className)}>
      <ComposableMap
        projectionConfig={{ scale }}
        className={cn('relative w-full h-full', mapClassName)}
      >
        <Geographies geography={geographyData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#222"
                stroke="#444"
                tabIndex={-1}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
        {hosts?.map((host) => {
          const { colorHex } = getHostColor(host)
          if (!host.location) {
            return null
          }
          return (
            <Marker
              key={host.id}
              coordinates={[host.location.longitude, host.location.latitude]}
            >
              <Tooltip content={getHostLabel({ host, currency, rate })}>
                <circle
                  r={activeHost?.publicKey === host.publicKey ? 12 : 5}
                  fill={colorHex}
                  stroke="#fff"
                  strokeWidth={activeHost?.publicKey === host.publicKey ? 4 : 1}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() => {
                    if (!host.location) {
                      return
                    }
                    onHostMapClick(host.id, [
                      host.location.latitude,
                      host.location.longitude,
                    ])
                  }}
                />
              </Tooltip>
            </Marker>
          )
        })}
      </ComposableMap>
    </div>
  )
}
