import { Avatar } from '@siafoundation/design-system'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import { ExplorerHost } from '@siafoundation/explored-types'
import { hashToAvatar } from '../../lib/avatar'
import { HostPricing } from './HostPricing'
import { HostInfo } from './HostInfo'

type Props = {
  host: ExplorerHost
  rates?: SiaCentralExchangeRates
}

export function HostHeader({ host, rates }: Props) {
  return (
    <div className="flex flex-col gap-x-4 gap-y-4">
      <Avatar
        src={hashToAvatar(host.publicKey)}
        shape="square"
        size="2"
        className="block sm:hidden relative top-0.5"
      />
      <div className="flex gap-x-4 gap-y-4 items-center">
        <Avatar
          src={hashToAvatar(host.publicKey)}
          shape="square"
          size="4"
          className="hidden sm:block"
        />
        <div className="flex flex-wrap gap-3 items-start justify-between w-full">
          <HostInfo host={host} />
          {host.settings && <HostPricing host={host} rates={rates} />}
        </div>
      </div>
    </div>
  )
}
