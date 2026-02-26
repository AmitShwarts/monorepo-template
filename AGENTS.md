# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a TypeScript monorepo template using **Yarn 3.6.3** (Berry) with workspaces. It contains two placeholder Express.js HTTP servers (`monorepo-template-package1` and `monorepo-template-package2`). No external services (databases, Docker, etc.) are required.

### Node version

The project requires **Node.js 18.18.0** (pinned in `.nvmrc`). Use `nvm use` to activate it. The default nvm alias should already be set to 18.18.0.

### Running services

- **package1:** `PORT=8080 yarn start:package1`
- **package2:** `PORT=8081 yarn start:package2`

Both packages default to port 8080 (via `nodemon.json`), so use different `PORT` env vars when running them simultaneously.

### Standard commands

See `package.json` scripts. Key ones:

| Command | Description |
|---|---|
| `yarn lint` | ESLint (no warnings allowed via `--max-warnings 0`) |
| `yarn test` | Tests (currently a no-op `:`) |
| `yarn build` | Build (currently a no-op `:`) |
| `yarn syncpack` | Check dependency version consistency across packages |

### Husky hooks

- **pre-commit:** checks `yarn.lock` is up-to-date and runs lint (with `no-console`/`no-debugger` enforced via `PRE_COMMIT` env var)
- **pre-push:** runs tests

### Gotchas

- The ESLint config (`.eslintrc.js`) conditionally enforces `no-debugger` and `no-console` rules only when `PRE_COMMIT=true` is set. During normal development these rules are off.
- Yarn 3 is managed via corepack (`corepack enable`); the Yarn binary is vendored at `.yarn/releases/yarn-3.6.3.cjs`.
