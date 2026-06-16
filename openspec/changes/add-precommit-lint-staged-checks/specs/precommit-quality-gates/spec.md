## ADDED Requirements

### Requirement: Monorepo lint-staged configuration

The repository SHALL define exactly one lint-staged configuration file at the monorepo root, and that configuration SHALL use generic staged file globs and lint-staged function tasks to run root lint and type-check commands.

#### Scenario: Single root lint-staged configuration exists

- **WHEN** the repository quality gate configuration is inspected
- **THEN** exactly one lint-staged configuration exists at the monorepo root
- **AND** no workspace defines a separate lint-staged configuration file

#### Scenario: Staged files trigger root quality commands

- **WHEN** staged files match the configured lint or type-check globs
- **THEN** lint-staged runs root commands for staged lint and type-check verification
- **AND** lint-staged does not list individual workspaces, require a POSIX shell wrapper, or use a custom workspace routing helper

### Requirement: Pre-commit hook execution

The repository SHALL provide a committed pre-commit hook that runs lint-staged from the monorepo root before a commit is created.

#### Scenario: Commit is blocked by failed staged checks

- **WHEN** a staged file causes its lint or type-check command to fail during pre-commit
- **THEN** the commit is rejected
- **AND** the failing command output is visible to the developer

#### Scenario: Commit proceeds after successful staged checks

- **WHEN** all lint-staged commands for staged files exit successfully
- **THEN** the pre-commit hook exits successfully
- **AND** Git continues creating the commit

### Requirement: Workspace-owned oxc lint commands

Each workspace that owns TypeScript or JavaScript source SHALL expose oxc-based lint commands, and each workspace SHALL be able to customize its lint rules without adding another lint-staged configuration file.

#### Scenario: Workspace lint command uses oxc

- **WHEN** a developer runs the lint command for a TypeScript or JavaScript workspace
- **THEN** the command executes oxc lint against that workspace's source files

#### Scenario: Root staged lint uses workspace scripts

- **WHEN** lint-staged runs the root staged lint command
- **THEN** Turbo runs the workspace-owned staged lint scripts

#### Scenario: Workspace customizes lint rules

- **WHEN** a workspace needs lint rules that differ from another workspace
- **THEN** the workspace can change its own lint configuration or lint script
- **AND** the root lint-staged configuration remains the only lint-staged configuration

### Requirement: Workspace type-check commands

Each TypeScript workspace SHALL expose an explicit type-check command that can be invoked manually and from lint-staged.

#### Scenario: Workspace type-check command validates TypeScript

- **WHEN** a developer runs a workspace type-check command
- **THEN** TypeScript validates that workspace without emitting build output

#### Scenario: Staged TypeScript changes trigger type-check

- **WHEN** staged TypeScript files belong to a workspace
- **THEN** lint-staged runs the root type-check command before allowing the commit
