import {
  Heading,
  Link,
  Paragraph,
  PatternedPanel,
  WebDomain,
  webLinks,
} from '@siafoundation/design-system'
import { random } from '@technically/lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { routes } from '../config/routes'
import { getAssetUrl, patterns } from '../content/assets'

type Props = {
  title: string
  subtitle: React.ReactNode
  link?: string
  linkText?: string
  image?: string
  background: string
  idea?: boolean
  children?: React.ReactNode
}

export function CalloutProject({
  title,
  subtitle,
  link,
  linkText,
  image,
  background,
  idea,
  children,
}: Props) {
  const router = useRouter()
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
        <Heading size="40" font="mono" weight="semibold">
          {title}
        </Heading>
        <Paragraph>{subtitle}</Paragraph>
        <div>
          {idea ? (
            router.asPath.startsWith(routes.grants.index) ? (
              <Link
                href={webLinks.forumGrantsProposed}
                target="_blank"
                underline="accent"
                color="contrast"
              >
                {linkText || `Apply for a grant related to ${title}`}
              </Link>
            ) : (
              <Link
                href={routes.grants.index}
                underline="accent"
                color="contrast"
              >
                {linkText || `Apply for a grant related to ${title}`}
              </Link>
            )
          ) : (
            <div className="flex flex-col gap-2">
              <div>
                <Link
                  href={link}
                  underline="accent"
                  target={externalLink ? '_blank' : undefined}
                  color="contrast"
                >
                  {linkText || `Learn more about ${title}`}
                </Link>
              </div>
              {externalLink && (
                <div className="flex gap-1 items-center">
                  <WebDomain link={link} />
                </div>
              )}
            </div>
          )}
        </div>
        {image && (
          <div className="relative h-48 -ml-7 transition-transform md:hover:scale-105">
            <Image
              src={getAssetUrl(`assets/images/${image}.png`)}
              alt={`Screenshot of ${title}`}
              quality={30}
              width={256 * 3}
              height={160 * 3}
              className="max-w-none select-none w-[150%]"
            />
          </div>
        )}
        {children}
      </div>
    </PatternedPanel>
  )
}
