import { ContractsProvider } from '../contexts/contracts'
import { MetricsProvider } from '../contexts/metrics'
import { DialogProvider, Dialogs } from '../contexts/dialog'
import { VolumesProvider } from '../contexts/volumes'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <VolumesProvider>
        <ContractsProvider>
          <MetricsProvider>
            {/* this is here so that dialogs can use all the other providers,
            and the other providers can trigger dialogs */}
            <Dialogs />
            {children}
          </MetricsProvider>
        </ContractsProvider>
      </VolumesProvider>
    </DialogProvider>
  )
}
