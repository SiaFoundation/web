import React, { useEffect } from 'react'
import { Box, Toaster } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

export function RootLayout({ children }: Props) {
  const router = useRouter()
  const { settings } = useSettings()

  useEffect(() => {
    if (router.pathname !== routes.unlock && !settings.password) {
      router.replace(routes.unlock)
    }
  }, [router, settings])

  return (
    <Box>
      <Toaster />
      {children}
    </Box>
  )
}
