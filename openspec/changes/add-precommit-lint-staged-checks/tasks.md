## 1. Tooling Setup

- [x] 1.1 Add root development dependencies for lint-staged and oxc lint tooling.
- [x] 1.2 Add a committed Git pre-commit hook under a versioned hooks directory that runs lint-staged from the monorepo root.
- [x] 1.3 Add a root setup script that configures Git to use the committed hooks directory.
- [x] 1.4 Add a root script for manually running lint-staged.

## 2. Root lint-staged Configuration

- [x] 2.1 Create exactly one monorepo-level lint-staged config at the repository root.
- [x] 2.2 Configure staged JavaScript and TypeScript file globs to run the root staged lint command.
- [x] 2.3 Configure staged TypeScript and TypeSpec file globs to run the root type-check command.
- [x] 2.4 Keep workspace names out of the root lint-staged configuration.
- [x] 2.5 Confirm no workspace contains a separate lint-staged configuration file.

## 3. Workspace Commands and Rules

- [x] 3.1 Replace frontend placeholder lint script with an oxc-based lint command and add explicit frontend `type-check` and staged-check scripts.
- [x] 3.2 Replace backend placeholder lint script with an oxc-based lint command and add explicit backend `type-check` and staged-check scripts.
- [x] 3.3 Replace api-dto placeholder lint script with an oxc-based lint command where applicable and add explicit api-dto `type-check` and staged-check scripts.
- [x] 3.4 Add package-local oxc configuration where a workspace needs package-specific lint rules or ignores.

## 4. Verification

- [x] 4.1 Run workspace lint commands and confirm they execute oxc lint instead of placeholder echo commands.
- [x] 4.2 Run workspace type-check commands and confirm they validate TypeScript without emitting build output.
- [x] 4.3 Run the root lint-staged command against representative staged frontend, backend, and api-dto files.
- [x] 4.4 Verify the pre-commit hook rejects a commit when a lint or type-check command fails.
- [x] 4.5 Run OpenSpec validation for `add-precommit-lint-staged-checks`.
