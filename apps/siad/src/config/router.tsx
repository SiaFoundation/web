import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import { Unlock } from '../pages/Unlock'
import { Advanced } from '../pages/Advanced'
import { WalletIndex } from '../pages/WalletIndex'
import { WalletView } from '../pages/WalletView'

export function Router() {
  return (
    <Routes>
      {/* <Route path={routes.home} element={<Home />} /> */}
      <Route path={routes.wallet.index} element={<WalletIndex />} />
      <Route path={routes.wallet.view} element={<WalletView />} />
      <Route path={routes.unlock} element={<Unlock />} />
      <Route path={routes.advanced} element={<Advanced />} />
      <Route path={'/*'} element={<Navigate to={routes.wallet.index} />} />
    </Routes>
  )
}
