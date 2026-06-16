## Context

The repository already uses pnpm and a local Git hooks directory configured through the root `prepare` and `setup:hooks` scripts. The current hook setup includes `pre-commit` for staged-file checks but does not validate commit messages.

The user explicitly selected `commitlint` as the enforcement tool for Conventional Commits, so this change adds the standard commitlint packages despite the repository rule to avoid dependencies unless approved.

## Goals / Non-Goals

**Goals:**

- Enforce a clear Conventional Commits header format locally.
- Keep the implementation at the monorepo root, because commit messages apply to the full repository.
- Reuse the existing `.githooks` setup.

**Non-Goals:**

- Add CI enforcement for commit messages.
- Add changelog generation or release automation.
- Change frontend, backend, or API DTO runtime behavior.

## Decisions

- Use `@commitlint/cli` with `@commitlint/config-conventional`.
- Store configuration in `commitlint.config.cjs` to match the repository's existing CommonJS root config style.
- Add a root `commitlint` script that delegates to the commitlint CLI.
- Add `.githooks/commit-msg` that runs `pnpm commitlint --edit "$1"`.
- Keep scope optional, but require `kebab-case` when a scope is present.
- Restrict allowed types to `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.

## Risks / Trade-offs

- Local hook enforcement depends on developers running `pnpm install` or `pnpm setup:hooks` so Git uses `.githooks`.
- CI will not reject invalid commit messages in this change.
- Strict type and scope validation may reject existing personal habits, but it keeps future history consistent.
