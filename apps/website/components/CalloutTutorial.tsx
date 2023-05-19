import {
  PatternedPanel,
  Heading,
  Paragraph,
  Link,
  Text,
  WebDomain,
} from '@siafoundation/design-system'
import { random } from 'lodash'
import Image from 'next/image'
import { useMemo } from 'react'
import { routes } from '../config/routes'
import { backgrounds } from '../content/imageBackgrounds'
import { contentImages } from '../content/imageContent'

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
  const bg = useMemo(() => {
    const bg = backgrounds[background]
    if (bg) {
      return bg
    }
    const bgList = Object.entries(backgrounds).map(([key, value]) => value)
    return bgList[random(bgList.length - 1)]
  }, [background])
  return (
    <PatternedPanel background={bg}>
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
            <Link
              href={link}
              underline="accent"
              target={externalLink ? '_blank' : undefined}
              color="contrast"
            >
              Read article
            </Link>
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
              src={contentImages[image]}
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
