import { ContractsProvider } from '../contexts/contracts'
import { MetricsProvider } from '../contexts/metrics'
import { DialogProvider, Dialogs } from '../contexts/dialog'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <ContractsProvider>
        <MetricsProvider>
          {/* this is here so that dialogs can use all the other providers,
            and the other providers can trigger dialogs */}
          <Dialogs />
          {children}
        </MetricsProvider>
      </ContractsProvider>
    </DialogProvider>
  )
}
