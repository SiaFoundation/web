import { Link, LinkButton } from '../core/Link'
import { LinkData } from '../lib/links'
import { cx } from 'class-variance-authority'

type Props = {
  links?: LinkData[]
  size?: '1' | '2' | '3'
  className?: string
}

export function Links({ links = [], size = '1', className }: Props) {
  if (!links.length) {
    return null
  }

  if (size === '3') {
    return (
      <div className={cx('flex gap-2 flex-wrap', className)}>
        {links.map((link) => (
          <div key={link.title + link.link}>
            <LinkButton
              variant="accent"
              size="medium"
              href={link.link}
              target={link.newTab ? '_blank' : undefined}
              rounded={false}
            >
              {link.title}
            </LinkButton>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cx('flex gap-6 flex-wrap', className)}>
      {links.map((link) => (
        <Link
          key={link.title + link.link}
          color="contrast"
          size={size === '2' ? '16' : '14'}
          font="mono"
          href={link.link}
          target={link.newTab ? '_blank' : undefined}
        >
          {link.title}
        </Link>
      ))}
    </div>
  )
}
