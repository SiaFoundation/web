import { useAppSettings } from '@siafoundation/react-core'
import { Globe } from './Globe'
import { useHosts } from '../../../contexts/hosts'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import { DataLabel } from '@siafoundation/design-system'
import { hostColors } from '../../../contexts/hosts/status'

export function HostMap() {
  const { gpu } = useAppSettings()
  const {
    setCmd,
    activeHost,
    onHostMapClick: onHostSelect,
    onHostMapHover: onHostHover,
    hostsWithLocation,
  } = useHosts()

  if (!gpu.shouldRender) {
    return null
  }

  return (
    <div className="w-full h-full">
      <Globe
        activeHost={
          activeHost?.location
            ? (activeHost as HostDataWithLocation)
            : undefined
        }
        hosts={hostsWithLocation}
        onHostClick={onHostSelect}
        onHostHover={onHostHover}
        onMount={(cmd) => {
          setCmd(cmd)
        }}
      />
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
