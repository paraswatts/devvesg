import { color, score } from 'src/routes/clients/analyze/baseline/common/utils';

describe('Grade scoring utilities', () => {
  describe('color', () => {
    test('it returns an appropriate color from a grade percentage value', () => {
      expect(color(0)).toBe('#CC0F29');
      expect(color(50)).toBe('#CC0F29');
      expect(color(59)).toBe('#CC0F29');
      expect(color(60)).toBe('#FE6F00');
      expect(color(69)).toBe('#FE6F00');
      expect(color(70)).toBe('#F9C610');
      expect(color(79)).toBe('#F9C610');
      expect(color(80)).toBe('#60B257');
      expect(color(89)).toBe('#60B257');
      expect(color(90)).toBe('#0ADE0A');
      expect(color(100)).toBe('#0ADE0A');
    });
  });

  describe('score', () => {
    test('it returns letter score appropriate to grade percentage value', () => {
      expect(score(100)).toBe('A+');
      expect(score(95)).toBe('A');
      expect(score(90)).toBe('A-');
      expect(score(89)).toBe('B+');
      expect(score(85)).toBe('B');
      expect(score(71)).toBe('C-');
      expect(score(79)).toBe('C+');
      expect(score(75)).toBe('C');
      expect(score(61)).toBe('D-');
      expect(score(69)).toBe('D+');
      expect(score(65)).toBe('D');
      expect(score(51)).toBe('F');
      expect(score(55)).toBe('F');
      expect(score(59)).toBe('F');
      expect(score(0)).toBe('F');
    });
  });
});
