import React from 'react'
import { useMonitorConnAndLock } from '../../hooks/useMonitorConnAndLock'

type Routes = {
  home: string
  lockscreen: string
  syncscreen: string
}

type Props = {
  children: React.ReactNode
  routes: Routes
}

export function AppRootLayout({ children, routes }: Props) {
  useMonitorConnAndLock(routes)

  return <div className="h-screen">{children}</div>
}
