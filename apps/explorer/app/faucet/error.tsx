'use client'

import { StateError } from '../../components/StateError'

export default function Page() {
  return (
    <StateError
      code={500}
      message="Error, there was an issue loading the faucet."
    />
  )
}
