import BaseNextImage from 'next/image'
import { styled } from '../config/theme'

export const Image = styled('img', {
  verticalAlign: 'middle',
  maxWidth: '100%',

  variants: {
    radius: {
      '1': {
        borderRadius: '$1',
      },
      '2': {
        borderRadius: '$2',
      },
      '3': {
        borderRadius: '$3',
      },
    },
  },
})

// For some reason the radius prop was not working when sharing the css object with Image
export const NextImage = styled(BaseNextImage, {
  verticalAlign: 'middle',
  maxWidth: '100%',

  variants: {
    radius: {
      '1': {
        borderRadius: '$1',
      },
      '2': {
        borderRadius: '$2',
      },
      '3': {
        borderRadius: '$3',
      },
    },
  },
})
