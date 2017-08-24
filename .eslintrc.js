module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:vue/recommended", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 7,
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        tabWidth: 4,
        semi: false,
        singleQuote: true,
        trailingComma: "es5"
      }
    ]
  }
};
