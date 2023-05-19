import { Section, TransparentGradient } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'
import { StaticImageData } from 'next/image'

type Props = {
  children: React.ReactNode
  background?: StaticImageData
  gradientClassName?: string
} & Omit<React.ComponentProps<typeof Section>, 'background'>

export function SectionTransparent({
  children,
  className,
  background,
  gradientClassName,
  ...props
}: Props) {
  return (
    <Section
      {...props}
      className={cx('relative z-10', className)}
      background={<TransparentGradient className={gradientClassName} />}
    >
      {children}
    </Section>
  )
}
