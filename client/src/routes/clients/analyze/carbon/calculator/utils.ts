export const filterInvalidNumbers = <T extends { [key: string]: number | undefined | null }>(_values: T) => {
  const values = { ..._values };
  let key: keyof T;
  for (key in values) {
    const value = values[key];
    if (value === undefined || value === null || isNaN(value) || value < 0) {
      delete values[key];
    }
  }
  return values;
};

export const numberValidator = { min: { value: 0, message: 'Must be positive' }, valueAsNumber: true };

export const percentValidator = { min: { value: 0, message: 'Value must be between 0 and 100' }, max: { value: 0, message: 'Value must be between 0 and 100' }, valueAsNumber: true };

export const validateDependentField = (dependencies: (number | undefined)[], message: string) => {
  return {
    validate: (value?: number) => {
      if (dependencies.some(fieldExists) && !fieldExists(value)) {
        return message;
      }
    },
  };
};

const fieldExists = (value: number | undefined) => {
  return value !== undefined && !isNaN(value);
};

// Used to validate that a list of numbers are all valid for grouped calculations (eg mpg and miles driven must both be present)
export const canCalculateGroup = (...values: (number | undefined)[]) => {
  return values.every((value) => value !== undefined && !isNaN(value) && value > 0);
};
