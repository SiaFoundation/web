import React from 'react'
import { AppPageHead } from '../AppPageHead'

type Props = {
  appName: string
  title?: string
  children: React.ReactNode
}

export function AppRootLayout({ appName, title, children }: Props) {
  return (
    <div className="h-screen">
      <AppPageHead appName={appName} title={title} />
      {children}
    </div>
  )
}
