import { Link, LinkButton } from '../core/Link'
import { Text } from '../core/Text'
import { Paragraph } from '../core/Paragraph'
import { AnimatedPanel } from './AnimatedPanel'
import { Heading } from '../core/Heading'
import { cx } from 'class-variance-authority'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  description: React.ReactNode
  actionTitle: string
  actionLink: string
  actionNewTab?: boolean
  startTime?: number
  size?: '0' | '1' | '2'
  className?: string
}

export function Callout({
  id,
  eyebrow,
  title,
  description,
  actionTitle,
  actionLink,
  actionNewTab,
  startTime,
  size = '1',
  className,
}: Props) {
  return (
    <AnimatedPanel
      id={id}
      startTime={startTime}
      className={className}
      variant="subtle"
    >
      <div
        className={cx(
          'flex flex-col items-start justify-end gap-4 relative h-full',
          size === '0'
            ? 'py-14 px-6'
            : size === '2'
            ? 'py-40 px-5 lg:px-16'
            : 'pt-40 pr-5 pb-6 pl-5'
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
        {size !== '2' ? (
          <Link
            href={actionLink}
            size="16"
            target={actionNewTab ? '_blank' : undefined}
          >
            {actionTitle}
          </Link>
        ) : (
          <LinkButton
            size="medium"
            variant="accent"
            rounded={false}
            href={actionLink}
            className="inline"
            target={actionNewTab ? '_blank' : undefined}
          >
            {actionTitle}
          </LinkButton>
        )}
      </div>
    </AnimatedPanel>
  )
}
