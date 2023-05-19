import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { backgrounds } from '../content/imageBackgrounds'
import { contentImages } from '../content/imageContent'

type Props = {
  version?: string
}

export function CalloutRenterd({ version }: Props) {
  return (
    <CalloutCoreSoftware
      name="renterd"
      variant="subtle"
      description={
        'A next-generation Sia renter, developed by the Sia Foundation. Smart defaults and a highly extensible API.'
      }
      daemon="renterd"
      version={version}
      href={routes.software.renterd}
      image={contentImages.renterd}
      background={backgrounds.natePath}
    />
  )
}
