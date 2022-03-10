import NextImage from 'next/image'
import { CSS, styled } from '../config/theme'

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
    fit: {
      fill: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
  },
  defaultVariants: {
    radius: '1',
  },
})

type NImageProps = {
  src: string
  height?: string | number
  width?: string | number
  radius?: React.ComponentProps<typeof Image>['radius']
  blurDataURL?: string
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive'
  alt: string
  css?: CSS
}

export function NImage({
  src,
  height,
  width,
  blurDataURL,
  layout,
  radius,
  alt,
  css,
}: NImageProps) {
  return (
    <Image
      as={NextImage}
      src={src}
      width={layout === 'fill' ? undefined : width}
      height={layout === 'fill' ? undefined : height}
      fit={layout === 'fill' ? 'fill' : undefined}
      layout={layout}
      radius={radius}
      blurDataURL={blurDataURL}
      alt={alt}
      css={css}
    />
  )
}
