import { Section, WavesBackdrop, Container } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
} & React.ComponentProps<typeof Section>

export function WaveSection({ children, css, ...props }: Props) {
  return (
    <Section
      {...props}
      width="flush"
      css={{
        position: 'relative',
        zIndex: 1,
        borderTop: '$sizes$frame solid $slate2',
        borderBottom: '$sizes$frame solid $slate2',
        ...css,
      }}
    >
      <Container>
        <WavesBackdrop />
        {children}
      </Container>
    </Section>
  )
}
