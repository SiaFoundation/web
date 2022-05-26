import React from 'react'
import { Toaster } from '@siafoundation/design-system'
import { Navigate, useLocation } from 'react-router-dom'
import { routes } from '../../config/routes'
import { useSettings } from '@siafoundation/react-core'

type Props = {
  children: React.ReactNode
}

export function RootLayout({ children }: Props) {
  const location = useLocation()
  const { settings } = useSettings()

  if (location.pathname !== routes.unlock && !settings.password) {
    return <Navigate to={routes.unlock} replace />
  }

  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
