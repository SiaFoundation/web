import { ContractsProvider } from '../contexts/contracts'
import { DataProvider } from '../contexts/data'
import { DialogProvider, Dialogs } from '../contexts/dialog'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <ContractsProvider>
        <DataProvider>
          {/* this is here so that dialogs can use all the other providers,
            and the other providers can trigger dialogs */}
          <Dialogs />
          {children}
        </DataProvider>
      </ContractsProvider>
    </DialogProvider>
  )
}
