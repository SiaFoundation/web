import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { patterns, getAssetUrl } from '../content/assets'

type Props = {
  version?: string
}

export function CalloutWalletd({ version }: Props) {
  return (
    <CalloutCoreSoftware
      name="walletd"
      description={
        'walletd is a watch-only wallet server. It does not have access to any private keys, only addresses derived from those keys. walletd is currently in alpha and only built for the Zen testnet.'
      }
      status="alpha"
      daemon="walletd"
      version={version}
      href={routes.software.walletd}
      image={getAssetUrl('assets/walletd/send.png')}
      background={patterns.nateTrickle}
    />
  )
}
