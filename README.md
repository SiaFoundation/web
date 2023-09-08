# [![Sia Web](https://sia.tech/assets/banners/sia-banner-web.png)](http://sia.tech)

# Web

Web packages for the Sia project and ecosystem.

## Apps

User interfaces for the Sia software. The latest Sia software takes a modular approach, with separate daemons and user interfaces for renting, hosting, the explorer, and advanced wallet functionality.

### [renterd](apps/renterd)

![stability-beta](https://img.shields.io/badge/stability-beta-yellow.svg)

The [`renterd`](https://github.com/siafoundation/renterd) user interface, focused on renting functionality.

### [hostd](apps/hostd)

![stability-beta](https://img.shields.io/badge/stability-beta-yellow.svg)

The [`hostd`](https://github.com/siafoundation/hostd) user interface, focused on hosting functionality.

### [walletd](apps/walletd)

![stability-alpha](https://img.shields.io/badge/stability-alpha-orange.svg)

The [`walletd`](https://github.com/siafoundation/walletd) user interface, includes a wallet with support for hot, cold, and hardware wallets.

### [explorer](apps/explorer)

![stability-mature](https://img.shields.io/badge/stability-mature-008000.svg)

The `explorer` user interface, a Sia blockchain explorer interface that powers [explore.sia.tech](https://explore.sia.tech) and [zen.sia.tech](https://zen.sia.tech).

## Libraries

![stability-wip](https://img.shields.io/badge/stability-work_in_progress-orange.svg)

> ⚠️ Please note that all libraries are currently unstable and subject to change or completely move. Do not depend on these libraries until version 1.0.0.

The Sia web libraries provide developers with convenient TypeScript SDKs for using Sia core types, blockchain utilities, data fetching, daemon-specific React hooks, and components for common functionality such as Siacoin/fiat input fields, transaction lists, files, and more.

- [@siafoundation/react-core](libs/react-core) - Core Sia types and library methods.
- [@siafoundation/react-renterd](libs/react-renterd) - React hooks for interacting with `renterd`.
- [@siafoundation/react-hostd](libs/react-hostd) - React hooks for interacting with `hostd`.
- [@siafoundation/react-walletd](libs/react-walletd) - React hooks for interacting with `walletd`.
- [@siafoundation/react-sia-central](libs/react-sia-central) - React hooks for interacting with the Sia Central API.
- [@siafoundation/sia-central](libs/sia-central) - Methods and types for interacting with the Sia Central API.
- [@siafoundation/sia-js](libs/sia-js) - Core Sia types and library methods for v1 `siad`.
- [@siafoundation/sia-nodejs](libs/sia-nodejs) - Sia NodeJS client for controlling a v1 `siad`.
- [@siafoundation/design-system](libs/design-system) - React-based design system used across Sia apps and websites.
- [@siafoundation/data-sources](libs/data-sources) - Data sources used for stats on the website.

## Internal

- [website](apps/website) - The main [sia.tech](https://sia.tech) website with information on the Sia project and the Sia Foundation.
- [assets](apps/assets) - Powers [api.sia.tech](https://api.sia.tech) and all downloadable assets on [sia.tech](https://sia.tech) such as the Sia software releases.
- [crons](apps/crons) - Background tasks for [api.sia.tech](https://api.sia.tech) and [sia.tech](https://sia.tech).

## Development

1. The Sia Web codebase is managed with the [Nx](https://nx.dev) build system. Either install `nx` globally via `npm install -g nx` or use `npx` to invoke commands.
2. Install dependencies with `npm install`.

## Community

Join the [Sia Discord](https://discord.gg/sia) to discuss Sia projects, codebases, and more!
