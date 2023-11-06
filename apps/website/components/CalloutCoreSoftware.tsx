import {
  PatternedPanel,
  Heading,
  Paragraph,
  Link,
  Badge,
} from '@siafoundation/design-system'
import Image from 'next/image'
import { GitHubRelease } from '@siafoundation/data-sources'

type Props = {
  name: string
  status?: string
  description: React.ReactNode
  href?: string
  daemon?: 'renterd' | 'hostd' | 'walletd'
  release?: GitHubRelease
  newTab?: boolean
  image?: string
  background: string
  children?: React.ReactNode
  testnetOnly?: boolean
}

export function CalloutCoreSoftware({
  name,
  status,
  description,
  href,
  image,
  background,
  children,
  newTab,
}: Props) {
  return (
    <PatternedPanel background={background}>
      <div className="flex flex-col gap-4 pt-8 pb-5 px-6">
        <div className="flex gap-2 items-center">
          <Heading size="40" font="mono" weight="semibold">
            {name}
          </Heading>
          {status && (
            <div className="relative top-0.5">
              <Badge variant="amber">{status}</Badge>
            </div>
          )}
        </div>
        <Paragraph>{description}</Paragraph>
        <div className="flex justify-between gap-4">
          {!children && (
            <div className="flex justify-end gap-4">
              <Link
                href={href}
                underline="accent"
                target={newTab ? '_blank' : undefined}
                disabled={!href}
                size="16"
              >
                {href ? `Learn more about the software` : 'Coming soon'}
              </Link>
            </div>
          )}
        </div>
        {image && (
          <div className="relative h-48 -ml-7 transition-transform md:hover:scale-105">
            <Image
              src={image}
              quality={30}
              width={256 * 3}
              height={160 * 3}
              alt={`Screenshot of ${name}`}
              className="max-w-none select-none w-[150%]"
            />
          </div>
        )}
        {children}
      </div>
    </PatternedPanel>
  )
}
