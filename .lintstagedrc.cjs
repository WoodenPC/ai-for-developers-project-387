module.exports = {
  '**/*.{js,jsx,ts,tsx,mjs,cjs}': () => 'pnpm lint:staged',
  '**/*.{ts,tsx,tsp}': () => 'pnpm type-check',
};
