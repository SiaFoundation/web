import { styled } from '../config/theme'
import { Flex } from '../core/Flex'
import { Container } from '../core/Container'

const BaseSection = styled('section', {
  variants: {
    py: {
      '0': {
        py: '0',
      },
      '1': {
        py: '$3',
        '@bp2': {
          py: '$3-5',
        },
      },
      '2': {
        py: '$3-5',
        '@bp2': {
          py: '$6',
        },
      },
      '3': {
        py: '$6',
        '@bp2': {
          py: '$8',
        },
      },
      '4': {
        py: '$9',
        '@bp2': {
          py: '$max',
        },
      },
    },
    pb: {
      '0': {
        pb: '0',
      },
      '1': {
        pb: '$3',
        '@bp2': {
          pb: '$3-5',
        },
      },
      '2': {
        pb: '$3-5',
        '@bp2': {
          pb: '$6',
        },
      },
      '3': {
        pb: '$6',
        '@bp2': {
          pb: '$8',
        },
      },
      '4': {
        pb: '$9',
        '@bp2': {
          pb: '$max',
        },
      },
    },
    pt: {
      '0': {
        pt: '0',
      },
      '1': {
        pt: '$3',
        '@bp2': {
          pt: '$3-5',
        },
      },
      '2': {
        pt: '$3-5',
        '@bp2': {
          pt: '$6',
        },
      },
      '3': {
        pt: '$6',
        '@bp2': {
          pt: '$8',
        },
      },
      '4': {
        pt: '$9',
        '@bp2': {
          pt: '$max',
        },
      },
    },
  },
})

type Props = React.ComponentProps<typeof BaseSection> & {
  gap?: React.ComponentProps<typeof Flex>['gap']
  width?: React.ComponentProps<typeof Container>['size']
}

export function Section({ children, gap = '7', width, ...props }: Props) {
  return (
    <Container size={width}>
      <BaseSection {...props}>
        <Flex direction="column" gap={gap}>
          {children}
        </Flex>
      </BaseSection>
    </Container>
  )
}
