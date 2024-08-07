import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { patterns, getAssetUrl } from '../content/assets'

export function CalloutRenterd() {
  return (
    <CalloutCoreSoftware
      name="renterd"
      description={
        'A next-generation Sia renter, developed by the Sia Foundation. Smart defaults and a highly extensible API.'
      }
      daemon="renterd"
      href={routes.software.renterd}
      image={getAssetUrl('assets/renterd/files.png')}
      background={patterns.natePath}
    />
  )
}
