import { Section } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
} & React.ComponentProps<typeof Section>

export function SectionSimple({ children, css, ...props }: Props) {
  return (
    <Section
      {...props}
      css={{
        position: 'relative',
        backgroundColor: '$loContrast',
        ...css,
      }}
    >
      {children}
    </Section>
  )
}
