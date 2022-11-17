import { DataProvider } from '../contexts/data'
import { DialogProvider } from '../contexts/dialog'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <DialogProvider>
      <DataProvider>{children}</DataProvider>
    </DialogProvider>
  )
}
