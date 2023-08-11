import { useAppSettings } from '@siafoundation/react-core'
import { Globe } from './Globe'
import { useHosts } from '../../../contexts/hosts'
import { HostDataWithLocation } from '../../../contexts/hosts/types'
import { DataLabel } from '@siafoundation/design-system'

export function HostMap() {
  const { gpu } = useAppSettings()
  const {
    setCmd,
    activeHost,
    onHostMapClick: onHostSelect,
    onHostMapHover: onHostHover,
    hostsWithLocation,
  } = useHosts()
  if (!(gpu.hasCheckedGpu && gpu.shouldRender)) {
    return null
  }

  return (
    <div className="w-full h-full">
      <div className="absolute top-5 left-5 flex gap-4">
        <DataLabel color="blue" label="Active & usable" />
        <DataLabel color="red" label="Active & unusable" />
        <DataLabel color="green" label="Potential host" />
      </div>
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
    </div>
  )
}
