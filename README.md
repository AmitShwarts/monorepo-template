# Monorepo Template
This project is a template for monorepo using `yarn@3.6.3` and `node@18.18.0`.

## Eslint
You can find the configuration file [here](./.eslintrc.js).<br/>
2 rules are being set to be checked on `pre-commit` only so it won't bother on dev time:
  1. `no-debugger`
  2. `no-console`

You can use `// eslint-disable-next-line no-console` in case needed.
## Dependabot
Will open PRs to update npm and github-worflows dependencies versions.

## Github Workflows:
1. **Build:** for each package
2. **Lint:** from root
3. **Test:** from root
4. **Dependabot auto approve and merge:** Will allow dependabot to approve and merge his prs.<br/>
To make this workflow work, please define the secret `TOKEN_GITHUB` with the correct permissions<br/>
Go [here](./.github/workflows/dependabot-auto-approve-merge.yml) and follow the instructions in order to enable it.

## Husky:
1. **pre-commit:** Will run before every commit and will check:
    1. `yarn.lock` is updated
    2. no `lint` warnings and errors
2. **pre-push:** Will run before every push and will run `tests`.

## PR Template
To edit the template edit [this](./.github/pull_request_template.md) file.
