import { Explored } from '.'

export async function example() {
  Explored({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })
}
