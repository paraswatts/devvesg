import { render, screen } from '@testing-library/react';

import { MultiSelectInput } from 'src/common/forms/MultiSelectInput';

describe('MultiSelectInput', () => {
  test('It renders an input', () => {
    render(<MultiSelectInput data-testid="test-1" />);
    expect(screen.getByTestId('test-1')).toBeInTheDocument();
  });
  test('It has the placeholder text', () => {
    const placeholderTest = 'This is a test';
    render(<MultiSelectInput data-testid="test-2" placeholder={placeholderTest} />);
    expect(screen.getByTestId('test-2')).toHaveTextContent(placeholderTest);
  });
});
