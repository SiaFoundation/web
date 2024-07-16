import { cx } from 'class-variance-authority'
import { Heading } from '../core/Heading'
import { Link } from '../core/Link'
import { Paragraph } from '../core/Paragraph'
import { Text } from '../core/Text'
import { PatternedPanel } from './PatternedPanel'
import { WebDomain } from './WebDomain'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  description: React.ReactNode
  actionTitle: string
  actionLink: string
  actionNewTab?: boolean
  size?: '0' | '1' | '2'
  className?: string
  background: string
}

export function Callout({
  id,
  eyebrow,
  title,
  description,
  actionTitle,
  actionLink,
  actionNewTab,
  size = '1',
  className,
  background,
}: Props) {
  const externalLink = actionLink && actionLink.startsWith('http')
  return (
    <PatternedPanel id={id} className={className} background={background}>
      <div
        className={cx(
          'flex flex-col items-start justify-end gap-4 relative h-full',
          size === '0'
            ? 'py-14 px-6'
            : size === '2'
              ? 'py-40 px-5 lg:px-16'
              : 'pt-40 pr-5 pb-6 pl-5',
        )}
      >
        {eyebrow && (
          <Text size="14" color="subtle" font="mono" className="uppercase">
            {eyebrow}
          </Text>
        )}
        <Heading size="40" font="mono" weight="semibold">
          {title}
        </Heading>
        <Paragraph className="pb-3">{description}</Paragraph>
        <div className="flex flex-col gap-2">
          {size !== '2' ? (
            <Link
              href={actionLink}
              size="16"
              underline="accent"
              target={actionNewTab ? '_blank' : undefined}
            >
              {actionTitle}
            </Link>
          ) : (
            <Link
              size="18"
              underline="accent"
              href={actionLink}
              className="inline"
              target={actionNewTab ? '_blank' : undefined}
            >
              {actionTitle}
            </Link>
          )}
          {externalLink && (
            <div className="flex gap-1 items-center">
              <WebDomain link={actionLink} />
            </div>
          )}
        </div>
      </div>
    </PatternedPanel>
  )
}
