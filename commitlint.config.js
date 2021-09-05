module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
  rules: {
    'type-enum': [2, 'always', ['feature', 'feedback', 'hotfix', 'revert', 'reset', 'force', 'refactor', 'fix']],
    'scope-empty': [2, 'never'],
  },
};
