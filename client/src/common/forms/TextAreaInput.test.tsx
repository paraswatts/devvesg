import { render, screen } from '@testing-library/react';

import { TextAreaInput } from 'src/common/forms/TextAreaInput';

describe('TextAreaInput', () => {
  test('It renders an input', () => {
    render(<TextAreaInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  test('It has the placeholder text', () => {
    const placeholderTest = 'This is a test';
    render(<TextAreaInput placeholder={placeholderTest} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', placeholderTest);
  });
});
