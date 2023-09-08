'use client'

import { StateError } from '../../../components/StateError'

export default function Page() {
  return (
    <StateError
      code={500}
      message="Error, the contract is either not yet confirmed or may be invalid."
    />
  )
}
