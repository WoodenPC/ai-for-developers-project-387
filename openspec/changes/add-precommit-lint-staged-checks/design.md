## Context

This pnpm monorepo has root orchestration through Turbo and separate frontend, backend, and api-dto workspaces. Each workspace currently exposes a `lint` script placeholder, while TypeScript checking is embedded in existing build or test commands. There is no committed pre-commit hook or lint-staged configuration.

The requested workflow needs one monorepo-level lint-staged configuration, but package-specific lint rule ownership. The change also needs to respect the API-first workspace boundary: quality tooling can be shared at the root, while frontend, backend, and api-dto commands remain inside their package manifests.

## Goals / Non-Goals

**Goals:**

- Add a single root `.lintstagedrc` that is the only lint-staged configuration file in the repository.
- Add a committed pre-commit hook that runs lint-staged from the repository root.
- Add package-level commands for oxc lint and type-check so each workspace can own its lint scope and rule set.
- Ensure staged commits fail when lint or type-check commands fail.
- Keep package ownership clear and avoid moving frontend/backend implementation concerns across workspace boundaries.

**Non-Goals:**

- Replace the existing build, test, or e2e workflows.
- Introduce API contract changes in `packages/api-dto`.
- Select or migrate frontend/backend frameworks.
- Add unrelated formatting rules or broad codebase rewrites.
- Add a hook-management dependency unless a native Git hook setup proves insufficient during implementation.

## Decisions

1. Use one root lint-staged configuration with generic commands.

   The root `.lintstagedrc` will map broad staged file globs to root commands such as `pnpm lint:staged` and `pnpm type-check`. This keeps lint-staged behavior discoverable in one place, avoids duplicated configs, and avoids listing individual workspaces in the lint-staged file. Alternatives considered: per-package lint-staged configs or a custom routing helper, both of which make the entry point harder to audit.

2. Keep lint rules and executable checks package-local.

   Each workspace will expose commands such as `lint`, `lint:staged`, and `type-check` as appropriate for its source layout. The root lint-staged file will invoke root orchestration commands, and Turbo will run the corresponding workspace scripts. This lets frontend, backend, and api-dto adjust their own oxc configuration without changing the monorepo entry point.

3. Use oxc for TypeScript/JavaScript linting.

   Workspaces with TypeScript/JavaScript source will use oxc lint commands for lint checks. The implementation should add package-local oxc configuration only where needed, keeping any ignore patterns or rule differences near the package they affect. Alternatives considered: reusing placeholder `lint` scripts, which does not provide real enforcement.

4. Add explicit type-check scripts.

   Type-checking should be a named package script rather than hidden behind `test` or `build`. lint-staged can then run type-check consistently for affected workspaces, and developers can run the same checks manually. For workspaces where TypeScript project configuration already exists, the command should reuse it.

5. Use a committed native Git pre-commit hook plus root setup script.

   The repository should commit a hook script under a versioned hooks directory and configure `core.hooksPath` from a root setup script, such as `prepare`. This provides a real pre-commit hook without adding an unrequested hook-management package. If implementation discovers cross-platform or install lifecycle issues that make native hooks insufficient, the dependency decision should be revisited explicitly.

## Risks / Trade-offs

- Type-check commands may be slower than lint-only staged checks → Prefer simple root orchestration for pre-commit correctness; optimize later only if commit latency becomes a real issue.
- lint-staged passes staged file paths while TypeScript project checks usually operate on whole projects → Invoke commands through `sh -c` so file arguments are ignored and package scripts run at project scope.
- Native Git hooks require local `core.hooksPath` configuration → Add a root setup script and document the committed hook path through package scripts so installs configure it automatically.
- Oxc rule coverage may differ from future package needs → Keep oxc configuration package-local so rules can diverge without creating more lint-staged configs.
