import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { patterns, getAssetUrl } from '../content/assets'
import { GitHubRelease } from '@siafoundation/data-sources'

type Props = {
  release: GitHubRelease
}

export function CalloutRenterd({ release }: Props) {
  return (
    <CalloutCoreSoftware
      name="renterd"
      description={
        'A next-generation Sia renter, developed by the Sia Foundation. Smart defaults and a highly extensible API.'
      }
      daemon="renterd"
      release={release}
      href={routes.software.renterd}
      image={getAssetUrl('assets/renterd/files.png')}
      background={patterns.natePath}
    />
  )
}
