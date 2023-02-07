import { HostsProvider } from '../../contexts/hosts'
import { Hosts } from '../../components/Hosts'

export default function HostsPage() {
  return (
    <HostsProvider>
      <Hosts />
    </HostsProvider>
  )
}
