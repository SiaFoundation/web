import { Section, WavesBackdrop } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
} & React.ComponentProps<typeof Section>

export function SectionWaves({ children, css, ...props }: Props) {
  return (
    <Section
      {...props}
      css={{
        position: 'relative',
        zIndex: 1,
        borderTop: '4px solid $slate3',
        borderBottom: '4px solid $slate3',
        ...css,
      }}
    >
      <WavesBackdrop />
      {children}
    </Section>
  )
}
