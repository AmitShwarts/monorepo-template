import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'packages/*/dist/**'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx,mjs,cjs}'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
      'no-console': process.env.PRE_COMMIT ? 'error' : 'off',
      'no-undef': 'off',
      'default-case': 'off',

      '@stylistic/arrow-spacing': ['warn', { before: true, after: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/max-len': ['warn', { code: 120, ignoreComments: true, ignoreStrings: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always' }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
);
