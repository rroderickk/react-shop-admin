module.esports = {
	env: {
		browser: true,
		amd: true,
		node: true,
		es6: true,
	},
	extends: [
		"eslint:recomemended",
		"plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
		"next",
		"next/core-web-vitals",
	],
	rules: {
		semi: ["error", "always"],
	},
};