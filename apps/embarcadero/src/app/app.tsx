import { initGlobalStyles, ThemeProvider } from '@siafoundation/design-system'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { CreateSwap } from './pages/CreateSwap'
import { InputSwap } from './pages/InputSwap'
import { StepSwap } from './pages/StepSwap'
import { routes } from './routes'

export function App() {
  initGlobalStyles()

  return (
    <ThemeProvider>
      <Layout>
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.create} component={CreateSwap} />
          <Route path={routes.input} component={InputSwap} />
          <Route path={routes.step} component={StepSwap} />
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    </ThemeProvider>
  )
}

export default App
