import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [
  inputPath = 'reports/lighthouse/lighthouse.report.json',
  outputPath = 'reports/lighthouse/lighthouse-summary.md',
] = process.argv.slice(2);

const report = JSON.parse(await readFile(inputPath, 'utf8'));
const reportUrl = report.finalDisplayedUrl ?? report.finalUrl ?? 'unknown URL';
const categories = Object.values(report.categories ?? {});
const audits = Object.values(report.audits ?? {});

const categoryRows = categories
  .map((category) => {
    const score =
      typeof category.score === 'number'
        ? Math.round(category.score * 100)
        : 'n/a';
    return `| ${category.title} | ${score} |`;
  })
  .join('\n');

const actionableAudits = audits
  .filter((audit) => {
    if (
      audit.score === null ||
      audit.score === undefined ||
      audit.score === 1
    ) {
      return false;
    }

    return (
      audit.scoreDisplayMode === 'numeric' ||
      audit.scoreDisplayMode === 'metricSavings' ||
      audit.scoreDisplayMode === 'binary'
    );
  })
  .sort((left, right) => auditPriority(right) - auditPriority(left))
  .slice(0, 10);

const actionItems =
  actionableAudits.length > 0
    ? actionableAudits
        .map((audit) => {
          const displayValue = audit.displayValue
            ? ` (${audit.displayValue})`
            : '';
          const description = stripMarkdownLinks(
            audit.description ?? ''
          ).trim();
          const detail = description ? `: ${description}` : '';

          return `- ${audit.title}${displayValue}${detail}`;
        })
        .join('\n')
    : '- No actionable Lighthouse fixes were reported.';

const lines = [
  '# Lighthouse report',
  '',
  `Audited URL: ${reportUrl}`,
  `Generated at: ${new Date().toISOString()}`,
  '',
  '## Category scores',
  '',
  '| Category | Score |',
  '| --- | ---: |',
  categoryRows,
  '',
  '## Needed project fixes',
  '',
  actionItems,
  '',
  'Open `lighthouse.report.html` from the workflow artifact for the full report.',
  '',
];

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, lines.join('\n'), 'utf8');

function auditPriority(audit) {
  const score = typeof audit.score === 'number' ? audit.score : 0;
  const numericValue =
    typeof audit.numericValue === 'number' ? audit.numericValue : 0;
  const numericUnit = audit.numericUnit ?? '';
  const scoreWeight = (1 - score) * 1000;
  const unitWeight = numericUnit.includes('millisecond')
    ? numericValue / 100
    : numericValue;

  return scoreWeight + unitWeight;
}

function stripMarkdownLinks(value) {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
