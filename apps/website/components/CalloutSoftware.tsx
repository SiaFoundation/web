/* eslint-disable @next/next/no-img-element */
import {
  AnimatedPanel,
  Heading,
  Paragraph,
  ImageProps,
  Link,
} from '@siafoundation/design-system'

type Props = {
  name: string
  description: React.ReactNode
  href?: string
  startTime: number
  imageProps?: ImageProps
  children?: React.ReactNode
  variant?: 'default' | 'subtle' | 'verySubtle'
}

export function CalloutSoftware({
  name,
  description,
  href,
  startTime,
  imageProps,
  children,
  variant = 'subtle',
}: Props) {
  return (
    <AnimatedPanel
      className="pt-8 pb-5 px-6 overflow-hidden"
      startTime={startTime}
      variant={variant}
    >
      <div className="flex flex-col gap-4">
        <Heading size="40" font="mono" weight="semibold">
          {name}
        </Heading>
        <Paragraph>{description}</Paragraph>
        {!children && (
          <Link href={href || '#'} disabled={!href} size="16">
            {href ? 'Learn more' : 'Coming soon'}
          </Link>
        )}
        {imageProps && (
          <div className="relative h-48 -ml-5 transition-transform md:hover:scale-105">
            <img
              src={imageProps.src}
              alt={`Screenshot of ${name}`}
              className="max-w-none select-none"
              style={{
                width: '150%',
              }}
            />
          </div>
        )}
        {children}
      </div>
    </AnimatedPanel>
  )
}
