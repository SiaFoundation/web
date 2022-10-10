import BaseNextImage from 'next/image'
import { CSS, styled } from '../config/theme'

const imageCss: CSS = {
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
}

export const Image = styled('img', imageCss)
export const NextImage = styled(BaseNextImage, imageCss)
