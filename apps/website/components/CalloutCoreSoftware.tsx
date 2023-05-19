import {
  PatternedPanel,
  Heading,
  Paragraph,
  Link,
} from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import Image, { StaticImageData } from 'next/image'
import { DownloadWidget } from './DownloadWidget'

type Props = {
  name: string
  description: React.ReactNode
  href?: string
  daemon?: 'renterd' | 'hostd' | 'walletd'
  version?: string
  newTab?: boolean
  image?: StaticImageData
  background: StaticImageData
  children?: React.ReactNode
}

export function CalloutCoreSoftware({
  name,
  description,
  href,
  daemon,
  version,
  image,
  background,
  children,
  newTab,
}: Props) {
  return (
    <PatternedPanel background={background}>
      <div className="flex flex-col gap-4 pt-8 pb-5 px-6">
        <Heading size="40" font="mono" weight="semibold">
          {name}
        </Heading>
        <Paragraph>{description}</Paragraph>
        <div className="flex justify-between gap-4">
          {!children && (
            <Link
              href={href || '#'}
              underline="accent"
              target={newTab ? '_blank' : undefined}
              disabled={!href}
              size="16"
            >
              {href ? 'Get started' : 'Coming soon'}
            </Link>
          )}
        </div>
        {image && (
          <div className="relative h-48 -ml-7 transition-transform md:hover:scale-105">
            <Image
              {...image}
              alt={`Screenshot of ${name}`}
              className="max-w-none select-none w-[150%]"
            />
          </div>
        )}
        {children}
      </div>
      {version && daemon && (
        <div
          className={cx(
            'absolute bottom-0 w-full bg-gray-200 px-6 py-2',
            'bg-white dark:bg-graydark-200',
            'border-t',
            'border-gray-400 dark:border-graydark-400'
          )}
        >
          <DownloadWidget daemon={daemon} version={version} />
        </div>
      )}
    </PatternedPanel>
  )
}
