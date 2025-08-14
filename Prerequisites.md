Before we begin, make sure you have the following installed:

- Node.js (v18 or above)
- npm or Yarn
- PostgreSQL (make sure the service is running)
- NestJS CLI

Install Required Dependencies
npm install --save @nestjs/typeorm typeorm
npm install --save pg

Fixing : ESLint rule if your project expects LF (Unix-style) line endings instead.
npm install --save-dev eslint-plugin-prettier

Change eslint.config.mjs then run : npx eslint . --fix

eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier-flat"; // ✅ Add this

export default defineConfig([
{
files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
plugins: {
js,
prettier: prettierPlugin, // ✅ Register the plugin
},
languageOptions: {
globals: globals.browser,
},
rules: {
...prettierPlugin.configs["recommended"].rules, // ✅ Add Prettier recommended rules
"prettier/prettier": ["error", { endOfLine: "auto" }], // ✅ Fix CRLF / ␍ issue
},
},
tseslint.configs.recommended,
]);

Install Class Validator
npm install class-validator class-transformer
