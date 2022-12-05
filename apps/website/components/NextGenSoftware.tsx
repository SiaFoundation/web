import { getImageProps } from '@siafoundation/design-system'
import { routes } from '../config/routes'
import renterdImage from '../assets/renterd/renterd-peek.png'
import hostdImage from '../assets/hostd/hostd-peek.png'
import { CalloutSoftware } from './CalloutSoftware'

const renterdImageProps = getImageProps(renterdImage)
const hostdImageProps = getImageProps(hostdImage)

export function NextGenSoftware() {
  return (
    <>
      <CalloutSoftware
        name="renterd"
        startTime={30}
        variant="subtle"
        description={
          'A next-generation Sia renter, developed by the Sia Foundation. Smart defaults and a highly extensible API.'
        }
        href={routes.software.renterd}
        imageProps={renterdImageProps}
      />
      <CalloutSoftware
        name="hostd"
        startTime={40}
        variant="subtle"
        description={
          'A next-generation Sia host, developed by the Sia Foundation. Built for performance and reliability.'
        }
        imageProps={hostdImageProps}
      />
    </>
  )
}
