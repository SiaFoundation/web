import { IconButton, NextLink, Tooltip } from '@siafoundation/design-system'
import { useRouter } from 'next/router'

type Props = {
  title: string
  children: React.ReactNode
  route: string
  onClick?: () => void
}

export function NavItem({ title, children, route, onClick }: Props) {
  const router = useRouter()
  const state = router.asPath === route
  return (
    <NextLink href={route} css={{ textDecoration: 'none' }}>
      <Tooltip
        side="right"
        align="end"
        sideOffset={5}
        alignOffset={7}
        content={title}
      >
        <IconButton
          variant="state"
          data-state={state ? 'open' : 'closed'}
          onClick={onClick}
        >
          {children}
        </IconButton>
      </Tooltip>
    </NextLink>
  )
}