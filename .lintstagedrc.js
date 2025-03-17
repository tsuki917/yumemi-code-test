// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    buildEslintCommand,
    () => "tsc",
  ],
  "!src/**/*.{js,jsx,ts,tsx}": "prettier --ignore-unknown --write",
};
