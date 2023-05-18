import React from 'react'
import { useMonitorConnAndLock } from '../../hooks/useMonitorConnAndLock'
import { AppPageHead } from '../AppPageHead'

type Routes = {
  home: string
  lockscreen: string
}

type Props = {
  connectivityRoute: string
  children: React.ReactNode
  routes: Routes
  appName: string
  title?: string
}

export function AppRootLayout({
  appName,
  title,
  connectivityRoute,
  children,
  routes,
}: Props) {
  useMonitorConnAndLock({
    route: connectivityRoute,
    routes,
  })

  return (
    <div className="h-screen">
      <AppPageHead appName={appName} title={title} />
      {children}
    </div>
  )
}
