/* global module */
module.exports = {
    'rules': {
        'no-console': ["error", {allow: ["warn", "error"]}]
    },
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
            'spread': true
        }
    }
};