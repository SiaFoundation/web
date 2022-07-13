import { SettingsProvider } from '@siafoundation/react-core'
import { DialogProvider } from '../contexts/dialog'
import { WalletsProvider } from '../contexts/wallets'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <SettingsProvider>
      <DialogProvider>
        <WalletsProvider>{children}</WalletsProvider>
      </DialogProvider>
    </SettingsProvider>
  )
}
