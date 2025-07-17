import { useState, useEffect } from 'react'
import { useAppSettings } from '@siafoundation/react-core'
import { useHosts } from '../../../contexts/hosts'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import { DataLabel, Tooltip } from '@siafoundation/design-system'
import { hostColors, getHostStatus } from '../../../contexts/hosts/status'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { getHostLabel } from './utils'
import { useActiveDaemonExplorerExchangeRate } from '@siafoundation/design-system'

export function HostMap() {
  const { gpu, settings } = useAppSettings()
  const { activeHost, onHostMapClick, hostsWithLocation } = useHosts()
  const { currency, rate } = useActiveDaemonExplorerExchangeRate()
  const [tooltipHost, setTooltipHost] = useState<HostDataWithLocation | null>(
    null
  )
  const [geographyData, setGeographyData] = useState<
    Record<string, unknown> | undefined
  >(undefined)

  useEffect(() => {
    import('./countries-110m.json').then((data) => {
      setGeographyData(data.default)
    })
  }, [])

  if (settings.siascan && !gpu.shouldRender) {
    return null
  }

  return (
    <div className="w-full h-full relative">
      <ComposableMap
        projectionConfig={{ scale: 220 }}
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
        {hostsWithLocation?.map((host) => {
          const { colorHex } = getHostStatus(host)
          return (
            <Marker
              key={host.publicKey}
              coordinates={[host.location.longitude, host.location.latitude]}
            >
              <Tooltip
                content={getHostLabel({ host, currency, rate })}
                open={tooltipHost?.publicKey === host.publicKey}
                onOpenChange={(open) => setTooltipHost(open ? host : null)}
              >
                <circle
                  r={activeHost?.publicKey === host.publicKey ? 12 : 5}
                  fill={colorHex}
                  stroke="#fff"
                  strokeWidth={activeHost?.publicKey === host.publicKey ? 4 : 1}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() =>
                    onHostMapClick(host.publicKey, [
                      host.location.latitude,
                      host.location.longitude,
                    ])
                  }
                  onMouseEnter={() => setTooltipHost(host)}
                  onMouseLeave={() => setTooltipHost(null)}
                />
              </Tooltip>
            </Marker>
          )
        })}
      </ComposableMap>
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
    </div>
  )
}
