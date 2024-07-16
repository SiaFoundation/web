import { routes } from '../config/routes'
import { getAssetUrl, patterns } from '../content/assets'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'

export function CalloutWalletd() {
  return (
    <CalloutCoreSoftware
      name="walletd"
      description={
        'walletd is the flagship Sia wallet, suitable for miners, exchanges, and everyday hodlers. Its client-server architecture gives you the flexibility to access your funds from anywhere, on any device, without compromising the security of your private keys.'
      }
      status="beta"
      daemon="walletd"
      testnetOnly
      href={routes.software.walletd}
      image={getAssetUrl('assets/walletd/send.png')}
      background={patterns.nateTrickle}
    />
  )
}
