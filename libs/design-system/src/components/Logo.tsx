import { Box } from '@siafoundation/design-system'
import logo from '../assets/logo.png'

export function Logo() {
  return (
    <Box
      as="img"
      src={logo}
      alt="Logo"
      css={{
        height: '30px',
      }}
    />
  )
}
