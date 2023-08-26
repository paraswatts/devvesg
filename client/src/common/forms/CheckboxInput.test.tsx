import { render, screen } from '@testing-library/react';

import { CheckboxInput } from 'src/common/forms/CheckboxInput';
import { FormField } from 'src/common/forms/FormField';

describe('CheckboxInput', () => {
  test('It renders an input', () => {
    render(<CheckboxInput />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  test('It has a label', () => {
    const labelTest = 'This is a test';
    render(
      <FormField id="checkbox-1" name="testCheckbox">
        <CheckboxInput label={labelTest} />
      </FormField>,
    );
    expect(screen.getByLabelText(labelTest)).toBeInTheDocument();
  });
});
