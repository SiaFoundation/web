'use client'

import { StateError } from '../../components/StateError'

export default function Page({ error }: { error: Error }) {
  console.error(error)
  return (
    <StateError
      code={500}
      message="Error, there was an issue loading the calculator."
    />
  )
}
