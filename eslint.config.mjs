import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["scripts/**/*.js"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        rules: {
            "react/no-unescaped-entities": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
];

export default eslintConfig;
