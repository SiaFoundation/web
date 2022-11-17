import { Section } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = React.ComponentProps<typeof Section>

export function SectionSimple({ className, ...props }: Props) {
  return (
    <Section
      {...props}
      className={cx('relative bg-white dark:bg-graydark-50', className)}
    />
  )
}
