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
        backgroundColor: '$brandGray2',
        color: '$brandGray11',
      },
      accent: {
        backgroundColor: '$brandAccent2',
        color: '$brandAccent12',
      },
    },
  },
  defaultVariants: {
    variant: 'accent',
  },
})
