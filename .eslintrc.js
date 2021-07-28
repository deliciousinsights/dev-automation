module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    jest: true,
    node: true,
    jquery: true,
  },
  extends: [
    'plugin:import/errors',
    'prettier',
    'standard',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        jsxSingleQuote: true,
        singleQuote: true,
        trailingComma: 'es5',
        semi: false,
      },
    ],
    'no-irregular-whitespace': 0,
  }
}
