import { Heading, DatumCard } from '@siafoundation/design-system'
import { RenterdAuthedLayout } from '../components/RenterdAuthedLayout'
import { RenterSidenav } from '../components/RenterSidenav'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'

export default function HomePage() {
  const { openDialog } = useDialog()

  return (
    <RenterdAuthedLayout
      title="Dashboard"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
    >
      <Heading>Activity</Heading>
      <div className="flex flex-wrap gap-7">
        <DatumCard label="Active contracts" value={54} />
        <DatumCard label="Files stored" value={54} />
        <DatumCard label="Storage usage" value={50000} />
      </div>
      <Heading>Financials</Heading>
      <div className="flex flex-wrap gap-7">
        <DatumCard label="Total allocated" value={54} />
        <DatumCard label="Total spent" value={54} />
        <DatumCard label="Storage spending" value={54} />
      </div>
    </RenterdAuthedLayout>
  )
}
