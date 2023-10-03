module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    'no-console': process.env.PRE_COMMIT ? 'error' : 'off',

    'no-undef': 'off',
    'arrow-spacing': ['warn', { 'before': true, 'after': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'no-trailing-spaces': 'error',
    'max-len': ['warn', {code: 120, ignoreComments: true, ignoreStrings: true}],
    'default-case': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {args: 'all', argsIgnorePattern: '^_'}],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
      },
    ],
    '@typescript-eslint/indent': ['error', 2],
  },
}