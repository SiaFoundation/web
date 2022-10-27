# [![Sia Web](https://sia.tech/banners/sia-banner-web.png)](http://sia.tech)

# Web

Web packages for the Sia project and ecosystem.

## Apps

- [siad](apps/siad) - The `siad` user interface, includes a wallet with support for hot, cold, and hardware wallets.
- [renterd](apps/renterd) - The `renterd` user interface, dedicated to renter related functionality.
- [hostd](apps/hostd) - The `hostd` user interface, dedicated to hosting related functionality.
- [explorer-v1](apps/explorer-v1) - The `explorer-v1` user interface, a Sia blockchain explorer interface for [Navigator](https://github.com/hakkane84/navigator-sia).
- [website](apps/website) - The main [sia.tech](https://sia.tech) website with information on the Sia project and the Sia Foundation.
- [asset-server](apps/asset-server) - Powers [api.sia.tech](https://api.sia.tech) and all downloadable assets on [sia.tech](https://sia.tech) such as the Sia software releases.
- [design-site](apps/design-site) - The [design.sia.tech](https://design.sia.tech) website for exploring the design system used across Sia apps and websites.

## Libraries

- [@siafoundation/react-core](libs/react-core) - Core Sia types and library methods.
- [@siafoundation/react-siad](libs/react-siad) - React hooks for interacting with `siad`.
- [@siafoundation/react-renterd](libs/react-renterd) - React hooks for interacting with `renterd`.
- [@siafoundation/react-hostd](libs/react-hostd) - React hooks for interacting with `hostd`.
- [@siafoundation/sia-js](libs/sia-js) - Core Sia types and library methods for v1 `siad`.
- [@siafoundation/sia-nodejs](libs/sia-nodejs) - Sia NodeJS client for controlling a v1 `siad`.
- [@siafoundation/design-system](libs/design-system) - React-based design system used across Sia apps and websites.
- [@siafoundation/data-sources](libs/data-sources) - Data sources used for stats on the website.
- [@siafoundation/env](libs/env) - Environment variables for use across projects.

## Development

1. The Sia Web codebase is managed with the [Nx](https://nx.dev) build system. Either install `nx` globally via `npm install -g nx` or use `npx` to invoke commands.
2. Install dependencies with `npm install`.

## Community

Join the [Sia Discord](https://discord.gg/sia) to discuss Sia projects, codebases, and more!
