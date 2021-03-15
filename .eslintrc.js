module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js", "craco.config.js", "node_module/**"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/prop-types": 0,
    "@typescript-eslint/no-empty-interface": 0
  }
};
