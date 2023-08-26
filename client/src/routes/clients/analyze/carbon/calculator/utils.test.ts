import { canCalculateGroup, filterInvalidNumbers } from 'src/routes/clients/analyze/carbon/calculator/utils';

describe('Calculator utilities', () => {
  describe('canCalculateGroup', () => {
    test('it returns true if all values are valid', () => {
      // Positive integers are valid
      expect(canCalculateGroup(1, 2, 3)).toBe(true);
      expect(canCalculateGroup()).toBe(true);
    });

    test('it returns false if some values are invalid', () => {
      // Undefined, NaN, 0 are invalid values
      expect(canCalculateGroup(undefined, 2, 3)).toBe(false);
      expect(canCalculateGroup(NaN, 2, 3)).toBe(false);
      expect(canCalculateGroup(0, 2, 3)).toBe(false);
    });
  });

  describe('filterInvalidNumbers', () => {
    test('it filters out invalid values', () => {
      expect(
        filterInvalidNumbers({
          postive: 1,
          zero: 0,
          notANumber: NaN,
          undef: undefined,
          nil: null,
          negative: -1,
        }),
      ).toStrictEqual({
        postive: 1,
        zero: 0,
      });
    });
  });
});
