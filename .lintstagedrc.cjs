module.exports = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': [
    () => 'pnpm lint:precommit',
    'prettier --write',
  ],
  '**/*.{ts,tsx,tsp}': () => 'pnpm type-check',
  'apps/frontend/**/*.{js,jsx,ts,tsx,json,css,md}': 'prettier --write',
};
