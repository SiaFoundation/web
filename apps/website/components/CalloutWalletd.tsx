import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { backgrounds } from '../content/imageBackgrounds'
import { contentImages } from '../content/imageContent'

type Props = {
  version?: string
}

export function CalloutWalletd({ version }: Props) {
  return (
    <CalloutCoreSoftware
      name="walletd"
      variant="subtle"
      description={
        'walletd is a watch-only wallet server. It does not have access to any private keys, only addresses derived from those keys.'
      }
      daemon="walletd"
      version={version}
      href={routes.software.walletd}
      image={contentImages.walletd}
      background={backgrounds.nateTrickle}
    />
  )
}
