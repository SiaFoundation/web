import { MultiSelectionMenu } from '@siafoundation/design-system'
import { HostsResetLostSectorCount } from './HostsResetLostSectorCount'
import { HostsAddBlocklist } from './HostsAddBlocklist'
import { HostsAddAllowlist } from './HostsAddAllowlist'
import { HostsRemoveBlocklist } from './HostsRemoveBlocklist'
import { HostsRemoveAllowlist } from './HostsRemoveAllowlist'
import { useHosts } from '../../../contexts/hosts'

export function HostsBulkMenu() {
  const { multiSelect } = useHosts()

  return (
    <MultiSelectionMenu multiSelect={multiSelect} entityWord="host">
      <div className="flex flex-col gap-1">
        <HostsAddAllowlist />
        <HostsAddBlocklist />
      </div>
      <div className="flex flex-col gap-1">
        <HostsRemoveAllowlist />
        <HostsRemoveBlocklist />
      </div>
      <HostsResetLostSectorCount />
    </MultiSelectionMenu>
  )
}
