module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        'plugin:vue/recommended',
        "prettier",
    ]
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "prettier"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                singleQuote: true,
                trailingComma: "es5"
            }
        ]
    }
}

