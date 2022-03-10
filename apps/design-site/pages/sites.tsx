import { Container } from '@siafoundation/design-system'
import { Site } from '../sections/Site'

export function Sites() {
  return (
    <Container size="3" css={{ py: '$5', bc: '$loContrast' }}>
      <Site />
    </Container>
  )
}

export default Sites
