import { CSS, Section, useTheme } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof Section> & {
  gradientCss?: CSS
}

export function SectionGradient({
  children,
  gradientCss,
  css,
  ...props
}: Props) {
  const { activeTheme } = useTheme()
  return (
    <Section
      {...props}
      css={{
        position: 'relative',
        backgroundColor: '$loContrast',
        zIndex: 1,
        '&::after': {
          position: 'absolute',
          pointerEvents: 'none',
          top: 0,
          width: '100%',
          zIndex: -1,
          height: '100%',
          content: '',
          opacity: 0.3,
          mixBlendMode: activeTheme === 'dark' ? 'lighten' : 'darken',
          background:
            'linear-gradient(177deg, $colors$loContrast 0%, $colors$slate7 78%, $colors$loContrast 98%)',
          // background:
          //   'radial-gradient(circle, $colors$slate6 0%, $colors$loContrast 46%)',
          ...gradientCss,
        },
        ...css,
      }}
    >
      {children}
    </Section>
  )
}
