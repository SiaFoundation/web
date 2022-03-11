import { styled } from '../config/theme'
import { Flex } from '..'
import { Container } from '../core/Container'

const BaseSection = styled('section', {
  boxSizing: 'border-box',
  flexShrink: 0,
  '&::before': {
    boxSizing: 'border-box',
    content: '""',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
  },

  variants: {
    size: {
      '0': {
        py: '0',
      },
      '1': {
        py: '$5',
        '@bp2': {
          py: '$6',
        },
      },
      '2': {
        py: '$6',
        '@bp2': {
          py: '$9',
        },
      },
      '3': {
        py: '$9',
        '@bp2': {
          py: '$11',
        },
      },
      '4': {
        py: '$11',
        '@bp2': {
          py: '$13',
        },
      },
    },
  },
  defaultVariants: {
    size: '2',
  },
})

type Props = React.ComponentProps<typeof BaseSection> & {
  fullWidth?: boolean
  gap?: React.ComponentProps<typeof Flex>['gap']
  container?: React.ComponentProps<typeof Container>
}

export function Section({
  children,
  fullWidth = false,
  gap = '7',
  container,
  ...props
}: Props) {
  if (fullWidth) {
    return (
      <BaseSection {...props}>
        <Flex direction="column" gap={gap}>
          {children}
        </Flex>
      </BaseSection>
    )
  }

  return (
    <Container {...container}>
      <BaseSection {...props}>
        <Flex direction="column" gap={gap}>
          {children}
        </Flex>
      </BaseSection>
    </Container>
  )
}
