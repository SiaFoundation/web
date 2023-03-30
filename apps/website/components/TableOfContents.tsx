import { Heading, Link, Ul, Li } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = {
  items: { href: string; title: string; target?: string }[]
  className?: string
}

export function TableOfContents({ items, className }: Props) {
  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <Heading color="subtle" className="mb-1" size="20">
        Table of contents
      </Heading>
      <Ul>
        {items.map((item) => (
          <Li key={item.href} color="subtle">
            <Link
              color="subtle"
              target={item.target}
              weight="medium"
              href={item.href}
              underline="hover"
            >
              {item.title}
            </Link>
          </Li>
        ))}
      </Ul>
    </div>
  )
}
