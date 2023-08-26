import { render, screen } from '@testing-library/react';

import { TextInput } from 'src/common/forms/TextInput';

describe('TextInput', () => {
  test('It renders an input', () => {
    render(<TextInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  test('It has the placeholder text', () => {
    const placeholderTest = 'This is a test';
    render(<TextInput placeholder={placeholderTest} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', placeholderTest);
  });
});
