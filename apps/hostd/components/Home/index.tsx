import { HomeRevenue } from './HomeRevenue'
import { HomeStorage } from './HomeStorage'
import { HomeContracts } from './HomeContracts'
import { HomePricing } from './HomePricing'
import { HomeOperations } from './HomeOperations'
import { HomeBandwidth } from './HomeBandwidth'
import { HomeCollateral } from './HomeCollateral'

export function Home() {
  return (
    <div className="p-6 flex flex-col gap-14">
      <HomeRevenue />
      <HomeCollateral />
      <HomeStorage />
      <HomeBandwidth />
      <HomeOperations />
      <HomeContracts />
      <HomePricing />
    </div>
  )
}
