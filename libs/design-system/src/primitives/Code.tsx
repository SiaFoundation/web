import { styled } from '../config/theme'

export const Code = styled('code', {
  fontFamily: '$mono',
  fontSize: 'max(12px, 85%)',
  whiteSpace: 'nowrap',
  padding: '2px 3px 2px 3px',
  borderRadius: '$1',

  variants: {
    variant: {
      gray: {
        backgroundColor: '$slate3',
        color: '$slate11',
      },
      green: {
        backgroundColor: '$primary2',
        color: '$primary12',
      },
    },
  },
  defaultVariants: {
    variant: 'green',
  },
})
