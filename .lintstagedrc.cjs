module.exports = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': () => 'pnpm lint:precommit',
  '**/*.{ts,tsx,tsp}': () => 'pnpm type-check',
};
