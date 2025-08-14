/* eslint-env node */
module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: ['error', 'tab'],
	},
	ignorePatterns: ['dist/', 'node_modules/'],
	globals: {
		module: 'readonly',
		exports: 'readonly',
		require: 'readonly',
	},
};
