import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-config-prettier'

const eslintrc = new FlatCompat()

export default [
  {
    ignores: ['dist/**/*'],
  },
  prettier,
  ...eslintrc.extends('@vue/eslint-config-typescript/recommended'),
  ...eslintrc.extends('plugin:vue/vue3-recommended'),
  ...eslintrc.extends('plugin:prettier/recommended'),
  ...eslintrc.extends('plugin:vue-pug/base'),
  {
    files: ['src/**/*.ts', 'src/**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
