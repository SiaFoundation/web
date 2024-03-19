# sdk

SDK for interacting directly with the Sia network from browsers and web clients.

## Installation

`npm install @siafoundation/sdk`

## Usage

```js
import { initSDK } from '@siafoundation/sdk'

const sdk = await initSDK()
const { phrase, error } = sdk.wallet.generateSeedPhrase()
```
