import React from 'react'
import { useMonitorConnAndLock } from '../../hooks/useMonitorConnAndLock'
import { AppPageHead } from '../AppPageHead'

type Routes = {
  home: string
  lockscreen: string
  syncscreen: string
}

type Props = {
  children: React.ReactNode
  routes: Routes
  appName: string
  title?: string
}

export function AppRootLayout({ appName, title, children, routes }: Props) {
  useMonitorConnAndLock(routes)

  return (
    <div className="h-screen">
      <AppPageHead appName={appName} title={title} />
      {children}
    </div>
  )
}
