import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    plugins: {
      prettier,
    },
  },
  ...compat.extends('standard'),
];
