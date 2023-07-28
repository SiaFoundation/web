import { Link, NavMenuLink } from '@siafoundation/design-system'

type Props = {
  title: string
  icon?: React.ReactNode
  href: string
  underline?: React.ComponentProps<typeof Link>['underline']
  size?: React.ComponentProps<typeof Link>['size']
}

export function NavbarLink({
  icon,
  title,
  href,
  underline = 'hover',
  size = '14',
}: Props) {
  return (
    <NavMenuLink
      underline={underline}
      weight="medium"
      size={size}
      href={href}
      passHref
      className="flex gap-2 items-center"
    >
      {icon}
      {title}
    </NavMenuLink>
  )
}
