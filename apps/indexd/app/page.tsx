import { routes } from '../config/routes'
import { Redirect } from '../components/Redirect'

export default function Page() {
  return <Redirect route={routes.config.index} />
}
