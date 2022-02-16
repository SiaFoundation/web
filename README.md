# Web

Web packages for the Sia project and ecosystem.

## Apps

- [Website](apps/website/README.md) - The main [sia.tech](https://sia.tech) website with information on the Sia project and the Sia Foundation.
- [Asset Server](apps/asset-server/README.md) - Powers [api.sia.tech](https://api.sia.tech) as well as the releases and transparency reports available on [sia.tech](https://sia.tech).
- [Design](apps/design-site/README.md) - The [design.sia.tech](https://design.sia.tech) website for exploring the design system used across Sia apps and websites.

## Libraries

- [@siafoundation/sia-js](libs/sia-js/README.md) - Core Sia types and library methods.
- [@siafoundation/sia-nodejs](libs/sia-nodejs/README.md) - Sia NodeJS client for controlling `siad`.
- [@siafoundation/design-system](libs/design-system/README.md) - React-based design system used across Sia apps and websites.
- [@siafoundation/data-sources](libs/data-sources/README.md) - Data sources used for stats on the website.
- [@siafoundation/env](libs/env/README.md) - Environment variables for the website server configuration.

# Development

## Setup

1. The Sia Web codebase is managed with the [Nx](https://nx.dev) build system. Either install `nx` globally via `npm install -g nx` or use `npx` to invoke commands.
2. Install dependencies with `npm install`.

### Website setup

```sh
# Create a local .env
cp .env.example .env

# Create asset directories in the projects root assets folder and add any test assets
mkdir assets/docs
mkdir assets/releases
mkdir assets/transparency
```

Run `nx serve website` for a dev server.

### Workflows

- [Sia release process →](https://www.notion.so/siafoundation/Web-6de3b72ac13e44a989bdffb72fce8996#bd5cb0ab038d4b35a49d4433dd6af614)
- [News release process →](https://www.notion.so/siafoundation/Web-6de3b72ac13e44a989bdffb72fce8996#4fc04d6e7c0749cfa6a99c6a83fc41bd)

## Tooling

The following examples outline how to use common `nx` commands.

## Development server

Run `nx serve <app>` for a dev server.

## Code scaffolding

Run `nx g @nrwl/react:component <component> --project=<project>` to generate a new component. Review the `nx` documentation for many more examples.

## Build

Run `nx build <project>` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test <project>` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e <app>` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand the workspace

Run `nx dep-graph` to see a diagram of project dependencies.
