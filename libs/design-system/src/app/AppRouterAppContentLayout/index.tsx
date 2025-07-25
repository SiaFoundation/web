'use client'

import { Container } from '../../core/Container'
import { ScrollArea } from '../../core/ScrollArea'
import { AppNavbar } from '../AppNavbar'

type Props = {
  title?: string
  size?: React.ComponentProps<typeof Container>['size']
  navTitle?: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
  stats?: React.ReactNode
  after?: React.ReactNode
  children: React.ReactNode
  scroll?: boolean
}

export function AppRouterAppContentLayout({
  title,
  navTitle,
  size = '4',
  nav,
  actions,
  stats,
  after,
  children,
  scroll = true,
}: Props) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <AppNavbar
        title={navTitle === undefined ? title : navTitle}
        nav={nav}
        actions={actions}
        stats={stats}
        after={after}
      />
      {scroll ? (
        <ScrollArea className="z-0">
          <Container size={size} pad={false}>
            <div className="flex flex-col gap-5">{children}</div>
          </Container>
        </ScrollArea>
      ) : (
        <Container
          size={size}
          pad={false}
          className="flex-1 flex flex-col gap-5 overflow-hidden"
        >
          {children}
        </Container>
      )}
    </div>
  )
}
