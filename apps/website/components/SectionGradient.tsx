import { Section } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = React.ComponentProps<typeof Section> & {
  className?: string
}

export function SectionGradient({ children, className, ...props }: Props) {
  return (
    <Section
      {...props}
      className={cx(
        [
          'relative',
          'bg-white',
          'dark:bg-graydark-50',
          'z-10',
          "after:content=['*']",
          'after:absolute',
          'after:pointer-events-none',
          'after:top-0',
          'after:w-full',
          'after:-z-10',
          'after:h-full',
          'after:opacity-30',
          'after:mix-blend-darken',
          'dark:after:mix-blend-lighten',
          'after:bg-gradient-to-b after:from-white after:via-gray-100 after:to-white',
          'dark:after:bg-gradient-to-b dark:after:from-graydark-50 dark:after:via-graydark-600 dark:after:to-graydark-50',
        ],
        className
      )}
    >
      {children}
    </Section>
  )
}
