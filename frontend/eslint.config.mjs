import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'indent': ['error', 2],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'semi': ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'max-len': ['error', { 'code': 120 }],
      '@typescript-eslint/consistent-type-imports': [
        'error', 
        {
          'prefer': 'type-imports',
        }
      ],
      'quotes': [
        'error',
        'single',
        {
          'avoidEscape': true,
          'allowTemplateLiterals': false
        }
      ],
      'eol-last': ['error', 'always'],
      'react/function-component-definition': [
        'error', 
        {
          'namedComponents': 'function-declaration',
          'unnamedComponents': 'function-expression'
        }
      ],
      '@typescript-eslint/no-namespace': 'off',
    },
  },
];
