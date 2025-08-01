'use client'

import { useState, useEffect } from 'react'
import { DataLabel } from '../../app/DataLabel'
import { Tooltip } from '../../core/Tooltip'
import { useExternalActiveExchangeRate } from '../../hooks/useExternalExchangeRate'
import { hostColors, getHostStatus } from './status'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { getHostLabel } from './utils'
import { HostMapHost } from './types'
import { cx } from 'class-variance-authority'

export type { HostMapHost }

export function HostMap({
  hosts,
  activeHost,
  onHostMapClick,
  scale = 220,
  className,
  showLegend = true,
}: {
  hosts: HostMapHost[]
  activeHost: HostMapHost | null
  onHostMapClick: (hostId: string, coordinates: [number, number]) => void
  scale?: number
  className?: string
  showLegend?: boolean
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
    <div className={cx('relative', className)}>
      <ComposableMap
        projectionConfig={{ scale }}
        style={{
          width: '100%',
          height: '100%',
          top: '10%',
          position: 'relative',
        }}
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
          const { colorHex } = getHostStatus(host)
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
      {showLegend && (
        <div className="absolute top-5 left-6 flex flex-col gap-1">
          <DataLabel
            color={hostColors.activeAndUsable.colorHex}
            label="Active contract & usable"
            size="12"
          />
          <DataLabel
            color={hostColors.activeAndUnusable.colorHex}
            label="Active contract & unusable"
            size="12"
          />
          <DataLabel
            color={hostColors.potentialHost.colorHex}
            label="No active contract"
            size="12"
          />
        </div>
      )}
    </div>
  )
}
