import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "indent": ["error", 2], // Enforce 2 spaces for indentation
      "quotes": ["error", "single", { "avoidEscape": true }], // Use single quotes
      "semi": ["error", "always"], // Enforce semicolons
      "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline
      "no-console": "warn", // Warn on console usage
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Ignore unused vars starting with _
      "object-curly-spacing": ["error", "always"], // Require spacing inside curly braces
      "array-bracket-spacing": ["error", "never"], // Disallow spacing inside array brackets
      "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      }], // Function spacing rules
      "eol-last": ["error", "always"], // Require newline at end of file
    },
  },
  pluginJs.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
    },
  },
];