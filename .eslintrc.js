module.exports = {
	"env": {
		"es6": true,
		"node": true,
		"browser": true,
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2019,
		"sourceType": "module"
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
