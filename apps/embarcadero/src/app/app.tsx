import { initGlobalStyles } from '@siafoundation/design-system'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Accept } from './Accept'
import { Layout } from './Layout'
import { Create } from './Create'
import { Finish } from './Finish'
import { Home } from './Home'

export function App() {
  initGlobalStyles()

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/accept" component={Accept} />
          <Route path="/finish" component={Finish} />
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
