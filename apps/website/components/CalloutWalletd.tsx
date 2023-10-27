import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { patterns, getAssetUrl } from '../content/assets'
import { GitHubRelease } from '@siafoundation/data-sources'

type Props = {
  release: GitHubRelease
}

export function CalloutWalletd({ release }: Props) {
  return (
    <CalloutCoreSoftware
      name="walletd"
      description={
        'walletd is the flagship Sia wallet, suitable for miners, exchanges, and everyday hodlers. Its client-server architecture gives you the flexibility to access your funds from anywhere, on any device, without compromising the security of your private keys.'
      }
      status="alpha"
      daemon="walletd"
      release={release}
      testnetOnly
      href={routes.software.walletd}
      image={getAssetUrl('assets/walletd/send.png')}
      background={patterns.nateTrickle}
    />
  )
}
