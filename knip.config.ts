import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  $schema: 'https://unpkg.com/knip@latest/schema.json',
  ignore: ['**/dist/**', '**/coverage/**', '**/node_modules/**', '**/.turbo/**'],
  includeEntryExports: false,
  ignoreDependencies: [
    '@changesets/cli',
    '@commitlint/cli',
    '@commitlint/config-conventional',
    'lint-staged',
    '@types/eslint',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitest/coverage-istanbul',
    'vite',
    'vitest',
  ],
  workspaces: {
    'packages/hash-router': {
      ignoreDependencies: ['@testing-library/user-event'],
      ignore: ['tsconfig.json'],
    },
  },
};

export default config;
