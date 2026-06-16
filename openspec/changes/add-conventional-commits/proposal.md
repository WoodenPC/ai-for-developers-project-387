## Why

Commit messages are currently not specified or validated, which makes history harder to scan and weakens automation opportunities such as changelog generation and release grouping. This change defines and enforces a consistent Conventional Commits format for the repository.

## What Changes

- Add a repository-level commit message format requirement based on Conventional Commits.
- Enforce commit messages locally through a `commit-msg` Git hook.
- Add commitlint configuration and package scripts at the monorepo root.
- Add commitlint development dependencies at the monorepo root.

## Capabilities

### New Capabilities

- `commit-message-format`: Defines the accepted commit message header format and local validation behavior.

### Modified Capabilities

- None.

## Impact

- Root package scripts and devDependencies.
- Root `pnpm-lock.yaml`.
- New commitlint configuration file.
- Existing `.githooks` hook directory, with a new `commit-msg` hook.
- No frontend, backend, or API DTO contract changes.
