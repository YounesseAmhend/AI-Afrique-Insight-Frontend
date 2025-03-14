import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "max-len": ["warn", { code: 90 }],
            "no-console": "warn",
            camelcase: "warn",
            curly: "warn",
            "require-await": "warn",
            eqeqeq: ["warn", "always"],
            "no-empty": "warn",
            "prefer-const": "warn",
            "no-var": "warn",
            "prefer-arrow-callback": "warn",
            "no-unused-vars": "warn",
            "no-shadow": "warn",
            "object-shorthand": "warn",
            "prefer-template": "warn",
            "dot-notation": "warn",
            "consistent-return": "warn",
            "array-callback-return": "warn",
            "prefer-destructuring": "warn",
            "no-param-reassign": "warn",
            "default-case": "warn",
            "no-else-return": "warn",
            "no-underscore-dangle": "warn",
            "import/order": ["warn", { "newlines-between": "always" }],
            "react-hooks/rules-of-hooks": "warn",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
);
