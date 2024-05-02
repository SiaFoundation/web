import { Hostd } from './api'

export async function example() {
  const hostd = Hostd({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })
  const state = await hostd.stateHost()
  const volumes = await hostd.volumes()
  console.log(state.data, volumes.data)
}
