import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { patterns, getAssetUrl } from '../content/assets'
import { GitHubRelease } from '@siafoundation/data-sources'

type Props = {
  release: GitHubRelease
}

export function CalloutHostd({ release }: Props) {
  return (
    <CalloutCoreSoftware
      name="hostd"
      description={
        'A next-generation Sia host, developed by the Sia Foundation. Built for performance and reliability.'
      }
      daemon="hostd"
      release={release}
      href={routes.software.hostd}
      image={getAssetUrl('assets/hostd/metrics.png')}
      background={patterns.nateTrickle}
    />
  )
}
