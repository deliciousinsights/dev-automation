# Dev automation and quality using Git hooks and Husky

You can whether clone that template or follow the steps described below to get Husky/Git hooks assist your daily job with **commit analysis (content analysis and formatting, message linting)** and **branch naming convention** (prevent bad branch name to be pushed/created on remote repository).

## What tools?

### pre-commit

- [Lint-staged](https://github.com/okonet/lint-staged): run your linter on staged content (ie what's ready for commit), automatically format and (re)stage what's updated (configured with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)).
- [Git precommit checks](https://mbrehin.github.io/git-precommit-checks/): run your own rules to detect common mistakes (text described with patterns) and stop (or warn) commit.

### commit-msg

- [Commitizen](https://commitizen.github.io/cz-cli/): configurable wizard that helps you write well structured commit messages.
- [Commitlint](https://commitlint.js.org/#/): verify commit message structure/format.

## pre-push

- [Validate branch name](https://github.com/JsonMa/validate-branch-name/blob/master/README.md): ensures the branch name your pushing to the remote follows the branch naming convention.

## Interested in tooling but not in template repository?

You can setup all of these in a minute following the given steps:

### 1. Install tools

*(You can just pick the ones you're interested in)*

```bash
npm i --save-dev husky eslint standard prettier eslint-config-prettier eslint-plugin-prettier lint-staged git-precommit-checks @commitlint/cli @commitlint/config-conventional commitizen validate-branch-name
```

Pfiou, that was hard! 😄

### 2. Setup tools

#### ESLint

ESLint needs to be configured. You must run the command below and answer the wizards questions: 

```bash
npx eslint --init

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard
✔ What format do you want your config file to be in? · JavaScript
```

#### Setup Prettier

We've done some tuning here for JS formatting with Prettier. You'll find a *prettier.config.js* file with the following content:

```js
module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'es5',
  semi: false,
}
```

#### What do want to check before committing?

```js
module.exports = {
  display: {
    notifications: true,
    offendingContent: true,
    rulesSummary: false,
    shortStats: true,
    verbose: false,
  },
  rules: [
    {
      message: 'You’ve got leftover conflict markers',
      regex: /^[<>|=]{4,}/m,
    },
    {
      message: 'Discontinued because something should not be committed!',
      regex: /do not commit/i,
    },
    {
      message: 'You have unfinished devs',
      nonBlocking: true,
      regex: /(?:FIXME|TODO)/,
    },
    {
      message: 'You’ve got leftover forced `true` conditions',
      regex: /if\s+\(?(?:.*\|\|\s*)?true\)?/,
    },
    // JS specific
    {
      filter: /\.js$/,
      message:
        '😫 Damnit! Auto-imports failed with Material-UI components or styles',
      regex: /^import \{ .* \} from '@material-ui\//,
    },
    {
      filter: /\.js$/,
      message:
        '🤔 Hum! Did you forget to remove some logs?',
      nonBlocking: true,
      regex: /^\s*console\.log/,
    },
    // Ruby/Rails specific
    {
      filter: /_spec\.rb$/,
      message: 'Your RSpec test suite is trimmed down by `focus` tags',
      regex: /(?:focus: true|:focus => true)/,
    },
    {
      filter: /_spec\.rb$/,
      message:
        'Your Ruby tests seems to have an active `save_and_open_page` call',
      regex: /save_and_open_page/,
    },
    {
      filter: /\.rb$/,
      message: 'Your Ruby file seems to have an active `binding.pry` call',
      regex: /^[^#]*\bbinding\.pry/,
    },
  ],
}
```

#### Setup commintlint

Add the following to *commitlint.config.js*:

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

#### Tune branch naming convention

We've overriden the default branch naming convention by adding the following to our *.validate-branch-namerc.js*:

```js
module.exports = {
  pattern: '^(main|staging|production)$|^(bump|feat|fix|rel(?:ease)?)\/.+$',
  errorMsg: '🤨 The branch you’re trying to push doesn’t match the expected convention, please rename it!',
}
```


#### Husky: automate Git hooks installation and triggering

First, Husky needs to create a dedicated directory (`/.husky`) to manage "in project" hooks.

```bash
npx husky install
```

In order to automate husky for later install of the project, we're encouraged to set it up as a "prepare" script:

```bash
npm set-script prepare "husky install"
```

Then we must ask Husky to configure the scripts we want to run for each targeted (Git) hook:

**pre-commit**:

```bash
npx husky add .husky/pre-commit "npx --no-install lint-staged && npx --no-install git-precommit-checks"
```

**commit-msg**:

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

**pre-push**:

```bash
npx husky add .husky/pre-push "npx --no-install validate-branch-name"
```

That's all folks! 🐱‍🏍