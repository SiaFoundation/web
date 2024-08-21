# explored-js

A Typescript SDK for interacting with the [`explored`](https://github.com/SiaFoundation/explored) API.

## installation

```sh
npm install @siafoundation/explored-js
```

## usage

```ts
import { Explored } from '@siafoundation/explored-js'

export async function exampleExploredDataFetch() {
  const explored = Explored({
    api: 'http://localhost:9980/api',
    password: 'password1337',
  })

  try {
    const transactionFeeResponse = await explored.txpoolFee()

    if (transactionFeeResponse.status !== 200)
      throw new Error(transactionFeeResponse.statusText)

    const transactionFee = transactionFeeResponse.data
    // Do Transaction Fee things.
    console.log(transactionFee)
  } catch (e) {
    // Handle the error
    console.log(e)
  }
}
```

## explored libraries

- [types](https://www.npmjs.com/package/@siafoundation/explored-types)
- [sdk](https://www.npmjs.com/package/@siafoundation/explored-js) (this repo)
- [react hooks](https://www.npmjs.com/package/@siafoundation/explored-react)

## API documentation

https://api.sia.tech/explored

#### The Sia Foundation

This library is brought to you by [The Sia Foundation](https://github.com/SiaFoundation), Inc.--a registered 501(c)(3) non-profit dedicated to revolutionizing data storage through decentralization.
