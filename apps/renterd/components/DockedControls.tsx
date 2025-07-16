import { OnboardingBar } from './OnboardingBar'
import { TransfersBar } from './TransfersBar'
import { EnabledBar } from './EnabledBar'

export function DockedControls({ children }: { children?: React.ReactNode }) {
  return (
    <div data-testid="docked-controls" className="flex flex-col gap-2">
      {children}
      <TransfersBar />
      <OnboardingBar />
      <EnabledBar />
    </div>
  )
}
