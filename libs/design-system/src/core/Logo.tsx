import logo from '../assets/shard.png'
import { Image } from './Image'

const props = typeof logo === 'string' ? { src: logo } : logo

type Props = {
  size?: number
  className?: string
}

export function Logo({ size = 24, className }: Props) {
  return (
    <Image
      priority
      src={props.src}
      alt="Logo"
      width={size}
      height={size}
      rounded={false}
      className={className}
    />
  )
}
