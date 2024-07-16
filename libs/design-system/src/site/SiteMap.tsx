import { Launch16 } from '@siafoundation/react-icons'
import { cx } from 'class-variance-authority'
import type React from 'react'
import { Heading } from '../core/Heading'
import { Link } from '../core/Link'
import { useIsExternalDomain } from '../hooks/useIsExternalDomain'
import type { LinkData } from '../lib/links'

export type MenuSection = {
  title: string
  links: LinkData[]
}

type Props = {
  menuSections: MenuSection[]
  onClick?: () => void
}

export function SiteMap({ menuSections, onClick }: Props) {
  return (
    <div className="flex flex-col py-5 gap-8 items-start">
      <div className="grid gap-x-6 gap-y-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {menuSections.map(({ title, links }) => (
          <div className="flex" key={title}>
            <div className="flex flex-col gap-8">
              <Heading font="mono">{title}</Heading>
              <div className="flex flex-col gap-2 md:gap-3">
                {links.map(({ title, link, newTab, disabled }) => (
                  <MenuLink
                    key={title + link}
                    link={link}
                    title={title}
                    newTab={newTab}
                    disabled={disabled}
                    onClick={!disabled ? onClick : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type MenuLinkProps = {
  link: string
  title: React.ReactNode
  onClick?: () => void
  newTab?: boolean
  disabled?: boolean
}

function MenuLink({ link, title, onClick, newTab, disabled }: MenuLinkProps) {
  const isExternal = useIsExternalDomain(link)
  return (
    <Link
      scaleSize="16"
      href={link}
      disabled={disabled}
      onClick={onClick}
      target={newTab ? '_blank' : undefined}
      color="subtle"
      className={cx('flex gap-0.5 items-center no-underline hover:underline')}
    >
      <span className="flex-none">{title}</span>
      {isExternal && (
        <span className="scale-75">
          <Launch16 />
        </span>
      )}
    </Link>
  )
}
