import path from "node:path";

const prettierBin = path.join(process.cwd(), "node_modules/prettier/bin/prettier.cjs");

export default {
  "*.{js,jsx,ts,tsx,json,css,md,html,yml,yaml}": (filenames) => {
    if (filenames.length === 0) return [];
    const files = filenames.map((file) => JSON.stringify(file)).join(" ");
    return [`node ${JSON.stringify(prettierBin)} --write ${files}`];
  },
};
