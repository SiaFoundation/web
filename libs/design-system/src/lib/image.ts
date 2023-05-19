// The image imports have different behaviour when the consuming is app is CRA vs Next
// CRA returns a URL string whereas Next returns an object with multiple image attributes.
// Also used to cast nextjs image imports that occur outside of a nextjs project.

export type ImageProps = {
  src: string
  height?: number
  width?: number
  blurDataURL?: string
}

export function getImageProps(image: string | ImageProps): ImageProps {
  return typeof image === 'string' ? { src: image } : image
}
