
module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/standard",

    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "prettier",
        "jest"
    ],
    rules: {
        "promise/catch-or-return": "error",
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                semi: false
            }
        ]
    }
};
