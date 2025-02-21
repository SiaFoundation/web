[![Sia Web](https://sia.tech/assets/banners/sia-banner-web.png)](http://sia.tech)

# Web

Web packages for the Sia project and ecosystem.s

## Apps

User interfaces for the Sia software. The latest Sia software takes a modular approach, with separate daemons and user interfaces for renting, hosting, the explorer, and advanced wallet functionality.

- [renterd](apps/renterd) - The [`renterd`](https://github.com/siafoundation/renterd) user interface, focused on renting functionality.
- [hostd](apps/hostd) - The [`hostd`](https://github.com/siafoundation/hostd) user interface, focused on hosting functionality.
- [walletd](apps/walletd) - The [`walletd`](https://github.com/siafoundation/walletd) user interface, includes a wallet with support for hot, cold, and hardware wallets.
- [explorer](apps/explorer) - The `explorer` user interface, a Sia blockchain explorer interface that powers [siascan.com](https://siascan.com) and [zen.siascan.com](https://zen.siascan.com).

## Libraries

![stability-beta](https://img.shields.io/badge/stability-beta-yellow.svg)

### TypeScript

The Sia web libraries provide developers with convenient TypeScript SDKs for using Sia core types, blockchain utilities, data fetching, daemon-specific React hooks, and components for common functionality such as Siacoin/fiat input fields, transaction lists, files, and more.

- [@siafoundation/sdk](libs/sdk) - SDK for interacting directly with the Sia network from browsers and web clients.
- [@siafoundation/renterd-js](libs/renterd-js) - SDK for interacting with `renterd`.
- [@siafoundation/renterd-react](libs/renterd-react) - React hooks for interacting with `renterd`.
- [@siafoundation/renterd-types](libs/renterd-types) - Types for `renterd`.
- [@siafoundation/hostd-js](libs/hostd-js) - SDK for interacting with `hostd`.
- [@siafoundation/hostd-react](libs/hostd-react) - React hooks for interacting with `hostd`.
- [@siafoundation/hostd-types](libs/hostd-types) - Types for `hostd`.
- [@siafoundation/walletd-js](libs/walletd-js) - SDK for interacting with `walletd`.
- [@siafoundation/walletd-react](libs/walletd-react) - React hooks for interacting with `walletd`.
- [@siafoundation/walletd-types](libs/walletd-types) - Types for `walletd`.
- [@siafoundation/explored-js](libs/explored-js) - SDK for interacting with `explored`.
- [@siafoundation/explored-react](libs/explored-react) - React hooks for interacting with `explored`.
- [@siafoundation/explored-types](libs/explored-types) - Types for `explored`.
- [@siafoundation/design-system](libs/design-system) - React-based design system used across Sia apps and websites.
- [@siafoundation/sia-central-types](libs/sia-central-types) - Types for the Sia Central API.
- [@siafoundation/sia-central-js](libs/sia-central-js) - SDK for interacting with the Sia Central API.
- [@siafoundation/sia-central-react](libs/sia-central-react) - React hooks for interacting with the Sia Central API.
- [@siafoundation/units](libs/units) - Methods and types for converting and displaying units.
- [@siafoundation/types](libs/types) - Core Sia types and library methods.
- [@siafoundation/react-core](libs/react-core) - Core library for building React hooks for interacting with a Sia daemon.

### Go

- [go.sia.tech/web/sdk](sdk) - SDK for signing transactions, encoding RPCs, computing merkle roots, and more. Compiled with WASM for use in the TypeScript SDK.
- [go.sia.tech/web/ui](ui) - Library for embedding NextJS applications in Go.
- [go.sia.tech/web/walletd](walletd) - HTTP handler with embedded `walletd` application.
- [go.sia.tech/web/renterd](renterd) - HTTP handler with embedded `renterd` application.
- [go.sia.tech/web/hostd](hostd) - HTTP handler with embedded `hostd` application.

## Internal

### Apps

- [website](apps/website) - The main [sia.tech](https://sia.tech) website with information on the Sia project and the Sia Foundation.
- [assets](apps/assets) - Powers [api.sia.tech](https://api.sia.tech) and all downloadable assets on [sia.tech](https://sia.tech) such as the Sia software releases.
- [crons](apps/crons) - Background tasks for [api.sia.tech](https://api.sia.tech) and [sia.tech](https://sia.tech).

### Libraries

- [@siafoundation/request](libs/request) - Core library for building request APIs.
- [@siafoundation/react-icons](libs/react-icons) - React-based icons used across Sia apps and websites.
- [@siafoundation/data-sources](libs/data-sources) - Data sources used for stats on the website.
- [@siafoundation/fonts](libs/fonts) - Next font configuration for use across apps.

### Testing

- [walletd-e2e](apps/walletd-e2e) - App for testing walletd.
- [renterd-e2e](apps/renterd-e2e) - App for testing renterd.
- [hostd-e2e](apps/hostd-e2e) - App for testing hostd.
- [explorer-e2e](apps/explorer-e2e) - App for testing explorer.
- [e2e](libs/e2e) - Shared e2e testing code.
- [@siafoundation/clusterd](libs/clusterd) - Methods for controlling `clusterd` in e2e testing.
- [@siafoundation/walletd-mock](libs/walletd-mock) - `walletd` data and API mock library for testing.
- [@siafoundation/sia-central-mock](libs/sia-central-mock) - Sia Central data and API mock library for testing.

## Development

1. The Sia Web codebase is managed with the [Nx](https://nx.dev) build system. Either install `nx` globally via `npm install -g nx` or use `npx` to invoke commands.
2. This repo follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary). Please use prefixes such as `feat:`, `fix:`, `docs:`, etc. when committing.
3. Install dependencies with `npm install`.
4. Run `nx test <app-name>` to run tests for a specific app.
5. Run `npx changeset` to create a changeset for your changes. This will prompt you for a description of your changes and will create a changeset file in the `.changeset` directory.

## Community

Join the [Sia Discord](https://discord.gg/sia) to discuss Sia projects, codebases, and more!
