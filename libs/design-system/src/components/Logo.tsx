import logo from '../assets/logo.png'
import { Image } from './Image'

const props = typeof logo === 'string' ? { src: logo } : logo

export function Logo() {
  return (
    <Image
      {...props}
      alt="Logo"
      css={{
        height: '30px',
      }}
    />
  )
}
