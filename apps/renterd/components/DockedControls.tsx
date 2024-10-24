import React from 'react'
import { OnboardingBar } from './OnboardingBar'
import { TransfersBar } from './TransfersBar'

export function DockedControls({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <TransfersBar />
      <OnboardingBar />
    </div>
  )
}
