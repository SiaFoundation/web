import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function Home() {
  const router = useRouter()
  const { openDialog } = useDialog()

  useEffect(() => {
    router.replace(routes.files.index)
  }, [router])

  return (
    <RenterdAuthedLayout
      title="Dashboard"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
    >
      {/* <Heading>Activity</Heading>
      <div className="flex flex-wrap gap-7">
        <DatumCard label="Files stored" value={54} />
        <DatumCard label="Storage usage" value={humanBytes(403204020032)} />
        <DatumCard label="Active contracts" value={54} />
      </div>
      <Heading>Autopilot</Heading>
      <div className="flex flex-wrap gap-7">
        <DatumCard
          label="Current period"
          value={status.data?.currentPeriod.toLocaleString()}
        />
        <DatumCard label="Total allocated" value={54} />
        <DatumCard label="Total spent" value={54} />
        <DatumCard label="Storage spending" value={54} />
      </div> */}
    </RenterdAuthedLayout>
  )
}
