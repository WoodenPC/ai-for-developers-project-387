## Why

The repository currently has placeholder lint scripts and no pre-commit quality gate, so formatting, lint, and type errors can reach commits inconsistently. A monorepo-level pre-commit workflow should enforce shared checks while still letting each workspace own the exact lint rules that apply to its source.

## What Changes

- Add a single monorepo-level lint-staged configuration as the pre-commit entry point.
- Add pre-commit execution through lint-staged so only staged files drive the commit-time checks.
- Add oxc lint commands for workspaces that own TypeScript/JavaScript source.
- Add explicit type-check commands for workspaces that own TypeScript source.
- Keep lint rule ownership package-local so frontend, backend, and shared packages can evolve their own lint scopes without duplicating lint-staged configuration.

## Capabilities

### New Capabilities

- `precommit-quality-gates`: Defines the monorepo pre-commit quality gate, shared lint-staged behavior, workspace lint rule ownership, oxc lint usage, and type-check requirements.

### Modified Capabilities

- None.

## Impact

- Root package scripts and development dependencies for pre-commit orchestration.
- Root lint-staged configuration.
- Workspace package scripts for lint and type-check commands.
- Workspace lint configuration files as needed for package-specific oxc rules.
- Developer commit workflow, with no API contract changes.
