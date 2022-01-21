# Web

Web packages for the Sia project and ecosystem.

## Apps

- [Website](apps/website/README.md) - The sia.tech website.
- [Assets](apps/assets/README.md) - Sia Foundation asset server for content such as releases, reports, and API docs.

## Libraries

- [@siafoundation/types](libs/types/README.md) - Common types for Sia libraries.
- [@siafoundation/design-system](libs/design-system/README.md) - React-based Design System for use across Foundation apps and websites.
- [@siafoundation/data-sources](libs/data-sources/README.md) - Data sources used for stats on the website.

# Development

The following examples outline how to use common `nx` workflows.

## Setup

1. The Sia Web codebase is managed with the [Nx](https://nx.dev) build system. Either install `nx` globally via `npm install -g nx` or use `npx` to invoke commands.
2. Install dependencies with `npm install`.

## Development server

Run `nx serve website` for a dev server.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=design-system` to generate a new component. Review the `nx` documentation for many more examples.

## Build

Run `nx build website` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test website` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e website` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand the workspace

Run `nx dep-graph` to see a diagram of project dependencies.
