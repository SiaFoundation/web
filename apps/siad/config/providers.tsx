import { SettingsProvider } from '@siafoundation/react-core'
import { DialogProvider } from '../contexts/dialog'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <SettingsProvider>
      <DialogProvider>{children}</DialogProvider>
    </SettingsProvider>
  )
}
