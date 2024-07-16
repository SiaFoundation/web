import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'

export function Home() {
  const router = useRouter()
  const { openDialog } = useDialog()

  useEffect(() => {
    router.replace(routes.buckets.index)
  }, [router])

  return (
    <RenterdAuthedLayout
      title="Dashboard"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
    >
      <div />
    </RenterdAuthedLayout>
  )
}
