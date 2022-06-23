import logo from '../assets/logo.png'
import { Image } from './Image'

const props = typeof logo === 'string' ? { src: logo } : logo

type Props = {
  size?: number
}

export function Logo({ size = 30 }: Props) {
  return <Image src={props.src} alt="Logo" width={size} height={size} />
}
