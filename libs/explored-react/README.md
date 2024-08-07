# explored-react

React hooks for interacting with the [`explored`](https://github.com/SiaFoundation/explored) API.

## installation

```sh
npm install @siafoundation/explored-react
```

## usage

```tsx
import { useTxpoolFee } from '@siafoundation/explored-react'
import { LoadingSpinner } from 'some-component-library'

export function TransactionPoolFeeIndicator() {
  const { data: fee, isValidating, error } = useTxpoolFee()

  if (fee) {
    return <span>{fee}<span>
  }
  if (isValidating) {
    return <LoadingSpinner />
  }
  return <span>{error.message}</span>
}
```

## explored libraries

- [types](https://www.npmjs.com/package/@siafoundation/explored-types)
- [sdk](https://www.npmjs.com/package/@siafoundation/explored-js)
- [react hooks](https://www.npmjs.com/package/@siafoundation/explored-react) (this repo)

## API documentation

https://api.sia.tech/explored

#### The Sia Foundation

This library is brought to you by [The Sia Foundation](https://github.com/SiaFoundation), Inc.--a registered 501(c)(3) non-profit dedicated to revolutionizing data storage through decentralization.
