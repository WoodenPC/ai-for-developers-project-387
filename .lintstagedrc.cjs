module.exports = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': [
    () => 'pnpm lint:precommit',
    'prettier --write',
  ],
  '**/*.{ts,tsx,tsp}': () => 'pnpm type-check',
};
