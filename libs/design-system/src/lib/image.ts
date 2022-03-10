// The image imports have different behaviour when the consuming is app is CRA vs Next
// CRA returns a URL string whereas Next returns an object with multiple image attributes.

type ImageProps = {
  src: string
  [key: string]: unknown
}

export function getImageProps(image: string | ImageProps): ImageProps {
  return typeof image === 'string' ? { src: image } : image
}
