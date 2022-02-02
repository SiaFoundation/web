import NextImage from 'next/image'
import { CSS, styled } from '../config/theme'

export const Image = styled('img', {
  verticalAlign: 'middle',
  maxWidth: '100%',
  borderRadius: '$2',

  variants: {
    fit: {
      fill: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
  },
})

type NImageProps = {
  src: string
  height?: string | number
  width?: string | number
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
  alt,
  css,
}: NImageProps) {
  return (
    <Image
      as={NextImage}
      src={src}
      height={height}
      width={width}
      fit={layout === 'fill' ? 'fill' : undefined}
      layout={layout}
      blurDataURL={blurDataURL}
      alt={alt}
      css={css}
    />
  )
}
