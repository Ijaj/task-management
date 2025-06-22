module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import", "unused-imports"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  rules: {
    "no-unused-vars": ["warn"],
    "unused-imports/no-unused-imports": "warn",
    "no-undef": "error",
    "import/order": ["warn", { "alphabetize": { "order": "asc" } }],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "indent": ["warn", 2]
  }
};
