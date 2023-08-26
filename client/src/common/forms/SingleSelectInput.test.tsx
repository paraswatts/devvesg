import { render, screen } from '@testing-library/react';

import { SingleSelectInput } from 'src/common/forms/SingleSelectInput';

describe('SingleSelectInput', () => {
  test('It renders an input', () => {
    render(<SingleSelectInput data-testid="test-1" />);
    expect(screen.getByTestId('test-1')).toBeInTheDocument();
  });
  test('It has the placeholder text', () => {
    const placeholderTest = 'This is a test';
    render(<SingleSelectInput data-testid="test-2" placeholder={placeholderTest} />);
    expect(screen.getByTestId('test-2')).toHaveTextContent(placeholderTest);
  });
});
