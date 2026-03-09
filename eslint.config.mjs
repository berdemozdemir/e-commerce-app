import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import stylistic from "@stylistic/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  eslintConfigPrettier,

  {
    plugins: {
      "@stylistic": stylistic,
      "unused-imports": unusedImports,
    },

    rules: {
      "@stylistic/arrow-parens": "warn",
      "@stylistic/template-curly-spacing": ["warn", "never"],
      "@stylistic/rest-spread-spacing": "warn",

      eqeqeq: "warn",
      "prefer-const": "warn",
      "prefer-template": "warn",
      "object-shorthand": ["warn", "always"],

      "import/newline-after-import": ["warn", { count: 1 }],
      "import/order": [
        "warn",
        {
          "newlines-between": "never",
        },
      ],
      "unused-imports/no-unused-imports": "warn",

      "no-useless-rename": "warn",
      "no-unneeded-ternary": "warn",
      "no-template-curly-in-string": "warn",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
    },
  },

  {
    ignores: [
      "**/node_modules",
      "**/.next",
      "**/.vercel",
      "**/dist",
      "**/out",
      "**/build",
      "**/coverage",
      "**/*.log",
      "**/*.sql",
      "**/*.tsbuildinfo",
      "**/next-env.d.ts",
    ],
  },
];

export default eslintConfig;
