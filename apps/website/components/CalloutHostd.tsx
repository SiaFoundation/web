import { routes } from '../config/routes'
import { CalloutCoreSoftware } from './CalloutCoreSoftware'
import { backgrounds } from '../content/imageBackgrounds'
import { contentImages } from '../content/imageContent'

type Props = {
  version?: string
}

export function CalloutHostd({ version }: Props) {
  return (
    <CalloutCoreSoftware
      name="hostd"
      variant="subtle"
      description={
        'A next-generation Sia host, developed by the Sia Foundation. Built for performance and reliability.'
      }
      daemon="hostd"
      version={version}
      href={routes.software.hostd}
      image={contentImages.hostd}
      background={backgrounds.nateTrickle}
    />
  )
}
