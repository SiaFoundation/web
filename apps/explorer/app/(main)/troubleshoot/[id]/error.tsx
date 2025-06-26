'use client'

import { StateError } from '../../../../components/StateError'

export default function Page({ error }: { error: Error }) {
  console.error(error)
  return (
    <StateError
      code={500}
      message="There was an issue loading troubleshooter data. The service may be down or you may be rate limited. Try again later."
    />
  )
}
