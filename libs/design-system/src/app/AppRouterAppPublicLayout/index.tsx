import { Container } from '../../core/Container'
import { AppNavbar } from '../AppNavbar'
import { AppBackdrop } from '../AppBackdrop'

type Props = {
  children: React.ReactNode
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function AppRouterAppPublicLayout({
  children,
  filters,
  actions,
}: Props) {
  return (
    <div className="h-screen">
      <AppBackdrop />
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <AppNavbar nav={filters} actions={actions} />
          <div className="flex-1">
            <Container className="h-full">{children}</Container>
          </div>
        </div>
      </div>
    </div>
  )
}
