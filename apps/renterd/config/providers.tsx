import { DialogProvider } from '../contexts/dialog'

type Props = {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return <DialogProvider>{children}</DialogProvider>
}
