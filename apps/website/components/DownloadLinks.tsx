import { Link, type LinkData } from '@siafoundation/design-system'

type Props = {
  links?: LinkData[]
}

export function DownloadLinks({ links = [] }: Props) {
  if (!links.length) {
    return null
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {links.map((link) => (
        <Link
          size="14"
          font="mono"
          key={link.title + link.link}
          color="contrast"
          href={link.link}
          underline="none"
          target={link.newTab ? '_blank' : undefined}
        >
          {link.title}
        </Link>
      ))}
    </div>
  )
}
