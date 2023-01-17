import { webLinks } from '@siafoundation/design-system'
import { useEffect } from 'react'
import { Faucet } from '../components/Faucet'
import { isMainnet } from '../config'

export default function FaucetPage() {
  useEffect(() => {
    if (isMainnet) {
      window.location.replace(webLinks.explore.testnetFaucet)
    }
  }, [])

  return <Faucet />
}
