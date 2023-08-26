const colors = [
  '#CC0F29',
  '#CC0F29',
  '#CC0F29',
  '#CC0F29',
  '#CC0F29',
  '#CC0F29',
  '#FE6F00',
  '#F9C610',
  '#60B257',
  '#0ADE0A',
  '#0ADE0A',
];
const letter = ['F', 'F', 'F', 'F', 'F', 'F', 'D', 'C', 'B', 'A', 'A'];
const suffix = ['-', '-', '-', null, null, null, null, null, '+', '+'];

const major = (num: number) => letter[Math.floor(num / 10)];
const minor = (num: number) => (num === 100 ? '+' : num < 60 ? '' : suffix[num % 10] || '');
export const color = (num: number) => colors[Math.floor(num / 10)];
export const score = (num: number) => (major(num) ? major(num) + minor(num) : major(num));
