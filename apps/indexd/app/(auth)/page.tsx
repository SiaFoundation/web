'use client'

import { Redirect } from '../../components/Redirect'
import { routes } from '../../config/routes'

export default function Page() {
  return <Redirect route={routes.hosts.index} />
}
