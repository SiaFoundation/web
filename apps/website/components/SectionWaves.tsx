import { Section, WavesBackdrop } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
} & React.ComponentProps<typeof Section>

export function SectionWaves({ children, className, ...props }: Props) {
  return (
    <Section
      {...props}
      className={cx(
        'relative z-10 border-t-4 border-b-4 border-gray-200 dark:border-graydark-200',
        className
      )}
    >
      <WavesBackdrop />
      {children}
    </Section>
  )
}
