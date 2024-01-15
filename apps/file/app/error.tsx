'use client'

import { Text } from '@siafoundation/design-system'

export default function Page({ error }: { error: Error }) {
  return <Text>{error.message}</Text>
}
