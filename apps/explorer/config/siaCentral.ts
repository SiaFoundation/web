import { SiaCentral } from '@siafoundation/sia-central-js'
import { siaCentralApi } from '.'

export const siaCentral = SiaCentral({ api: siaCentralApi })
