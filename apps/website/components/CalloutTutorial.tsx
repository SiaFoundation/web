import {
  PatternedPanel,
  Heading,
  Paragraph,
  Link,
  Text,
  WebDomain,
} from '@siafoundation/design-system'
import { random } from '@technically/lodash'
import Image from 'next/image'
import { useMemo } from 'react'
import { routes } from '../config/routes'
import { patterns, getAssetUrl } from '../content/assets'

type Props = {
  title: string
  subtitle: React.ReactNode
  link?: string
  image?: string
  background: string
  idea?: boolean
  children?: React.ReactNode
}

export function CalloutTutorial({
  title,
  subtitle,
  link,
  image,
  background,
  idea,
  children,
}: Props) {
  const externalLink = link && link.startsWith('http')
  const backgroundPattern = useMemo(() => {
    if (background) {
      return getAssetUrl(`assets/patterns/${background}.png`)
    }
    const bgList = Object.entries(patterns).map(([key, value]) => value)
    return bgList[random(bgList.length - 1)]
  }, [background])
  return (
    <PatternedPanel background={backgroundPattern}>
      <div className="flex flex-col gap-4 pt-8 pb-5 px-6">
        <Heading size="24" font="mono" weight="semibold">
          {title}
        </Heading>
        <Paragraph>{subtitle}</Paragraph>
        {idea ? (
          <div className="flex flex-col gap-2">
            <Link disabled>Article coming soon</Link>
            <Text size="12">
              Have a related idea?{' '}
              <Link
                size="12"
                href={routes.grants.index}
                underline="hover"
                color="contrast"
              >
                Apply for a Grant →
              </Link>
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div>
              <Link
                href={link}
                underline="accent"
                target={externalLink ? '_blank' : undefined}
                color="contrast"
              >
                Read article
              </Link>
            </div>
            {externalLink && (
              <div className="flex gap-1 items-center">
                <WebDomain link={link} />
              </div>
            )}
          </div>
        )}
        {image && (
          <div className="relative h-48 -ml-7 transition-transform md:hover:scale-105">
            <Image
              src={getAssetUrl(`assets/images/${image}.png`)}
              quality={30}
              width={256 * 3}
              height={160 * 3}
              alt={`Screenshot of ${title}`}
              className="max-w-none select-none w-[150%]"
            />
          </div>
        )}
        {children}
      </div>
    </PatternedPanel>
  )
}
