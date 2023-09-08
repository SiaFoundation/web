import { Avatar } from '@siafoundation/design-system'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import { hashToAvatar } from '../../lib/avatar'
import { HostPricing } from './HostPricing'
import { HostInfo } from './HostInfo'

type Props = {
  host: SiaCentralHost
  rates: SiaCentralExchangeRates
}

export function HostHeader({ host, rates }: Props) {
  return (
    <div className="flex flex-col gap-x-4 gap-y-4 pt-5 sm:pt-10 pb-4">
      <Avatar
        src={hashToAvatar(host.public_key)}
        shape="square"
        size="2"
        className="block sm:hidden relative top-0.5"
      />
      <div className="flex gap-x-4 gap-y-4 items-center">
        <Avatar
          src={hashToAvatar(host.public_key)}
          shape="square"
          size="4"
          className="hidden sm:block"
        />
        <div className="flex flex-wrap gap-3 items-start justify-between w-full">
          <HostInfo host={host} />
          <HostPricing host={host} rates={rates} />
        </div>
      </div>
    </div>
  )
}
