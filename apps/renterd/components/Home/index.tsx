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
      <div />
    </RenterdAuthedLayout>
  )
}
