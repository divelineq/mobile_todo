# ⚡ Contributing to TaskPilot: The High-Velocity Mobile App

Thank you for considering contributing to TaskPilot! This project is governed by the principles of Zero-Defect, High-Velocity, and Future-Proof architecture enforced by the Apex Technical Authority. Your contributions help maintain our 2026 professional standard.

Please ensure you read and adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) before submitting any contribution.

## 1. Development Environment Setup

TaskPilot is built on the modern React Native ecosystem using Expo. We require a robust local setup to ensure cross-platform consistency.

### Prerequisites

You must have the following installed:
1.  **Node.js (LTS):** Version 18+ or 20+.
2.  **Expo CLI:** Install globally (`npm install -g expo-cli`) or use `npx`.
3.  **Dependency Manager:** We use `npm` for consistent dependency management.

### Getting Started

bash
# 1. Clone the repository
git clone https://github.com/chirag127/TaskPilot-CrossPlatform-ToDo-Mobile-App.git
cd TaskPilot-CrossPlatform-ToDo-Mobile-App

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npm start


## 2. Contribution Workflow (The Apex Standard)

We follow the standard Git Flow with a focus on atomic commits and high-quality Pull Requests (PRs). All changes must be made in a dedicated, descriptive branch.

1.  **Fork** the repository.
2.  **Clone** your fork.
3.  Create a descriptive **feature branch**: `git checkout -b feat/my-new-feature` or `fix/issue-description`.
4.  Make your changes, ensuring 100% adherence to all linting, formatting, and testing standards (see Section 3).
5.  **Commit** using [Conventional Commits](#4-commit-message-guidelines).
6.  Push your changes: `git push origin feat/my-new-feature`.
7.  Open a **Pull Request** against the `main` branch of the upstream repository. Ensure you fill out our provided [Pull Request Template](./PULL_REQUEST_TEMPLATE.md).

## 3. Style, Linting, and Quality Assurance

We enforce strict code quality using **ESLint** and **Prettier** to ensure uniformity across the JavaScript and React components.

*   **Zero Lint Warnings:** PRs must pass all CI checks, including static analysis and linting, without warnings or errors. Failure to pass linting locally means the CI pipeline will fail.
*   **Formatting:** Code must be automatically formatted before committing.

### Standard Quality Commands

| Command | Purpose |
| :--- | :--- |
| `npm run lint` | Runs the code linter (ESLint). |
| `npm run format` | Automatically fixes code formatting issues (Prettier). |
| `npm run check` | Runs both linting and type checks. |

## 4. Testing and Verification

All new features and bug fixes **must** be accompanied by relevant unit tests. We use **Jest** for robust component and utility testing.

*   **Test Coverage:** Aim for high coverage on all new logical paths (e.g., utility functions, state management changes).
*   **Verification:** Ensure all existing tests pass before submission.

bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch


## 5. Commit Message Guidelines

We utilize the **Conventional Commits** specification to enable automated version bumping and streamlined change tracking (following SEMVER). 

Format: `<type>(<scope>): <description>`

### Types Supported

| Type | Description | Resulting SEMVER Change |
| :--- | :--- | :--- |
| `feat` | A new feature implementation. | Minor |
| `fix` | A bug fix (patches existing code). | Patch |
| `docs` | Documentation only changes. | None |
| `style` | Formatting, whitespace, or similar non-functional changes. | None |
| `refactor`| Code change that neither fixes a bug nor adds a feature. | None |
| `perf` | A code change that improves performance. | None |
| `test` | Adding missing tests or correcting existing tests. | None |
| `ci` | Changes to our CI configuration files and scripts. | None |
| `build` | Changes that affect the build system or external dependencies (e.g., package updates). | None |

**Example:** `feat(storage): implement secure async storage for task persistence`