## ADDED Requirements

### Requirement: Commit messages follow Conventional Commits

Repository commits MUST use the Conventional Commits header format:
`<type>[optional scope]: <description>`.

Allowed types MUST be `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.

Scope MAY be omitted. When scope is present, it MUST be kebab-case.

The description MUST be present.

#### Scenario: Valid commit without scope

- **WHEN** a commit message is `feat: add booking calendar`
- **THEN** commit message validation passes

#### Scenario: Valid commit with kebab-case scope

- **WHEN** a commit message is `fix(api-dto): align booking response`
- **THEN** commit message validation passes

#### Scenario: Invalid missing type format

- **WHEN** a commit message is `add booking calendar`
- **THEN** commit message validation fails

#### Scenario: Invalid scope case

- **WHEN** a commit message is `fix(ApiDto): align booking response`
- **THEN** commit message validation fails

### Requirement: Commit message validation runs from Git commit-msg hook

Repository Git hooks MUST validate commit messages before commits are accepted locally.

#### Scenario: Invalid commit through Git

- **WHEN** a developer attempts to commit with an invalid commit message
- **THEN** the `commit-msg` hook rejects the commit

#### Scenario: Valid commit through Git

- **WHEN** a developer attempts to commit with a valid Conventional Commits message
- **THEN** the `commit-msg` hook allows the commit to proceed
