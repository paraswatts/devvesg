import { render, screen } from '@testing-library/react';

import { FormField } from 'src/common/forms/FormField';
import { TextInput } from 'src/common/forms/TextInput';

describe('FormField', () => {
  test('It renders a FormField', () => {
    const testName = 'test-field-name-1';
    render(
      <FormField id="ff-1" name={testName}>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('name', testName);
  });

  test('It renders a FormField with a label', () => {
    const testName = 'test-field-name-2';
    const testLabel = 'test-label-1';
    render(
      <FormField id="ff-1" name={testName} label={testLabel}>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByLabelText(testLabel)).toHaveAttribute('name', testName);
  });

  test('It renders a FormField with a screen-reader-only label', async () => {
    const testName = 'test-field-name-3';
    const testLabel = 'test-label-2';
    render(
      <FormField id="ff-1" name={testName} label={testLabel} labelSrOnly>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByLabelText(testLabel)).toHaveAttribute('name', testName);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText(testLabel).closest('label')).toHaveClass('sr-only');
  });

  test('It renders a FormField with preFieldContent', () => {
    const testContent = <span data-testid="test-content">Test Content</span>;
    render(
      <FormField id="ff-1" name="testName" preFieldContent={testContent}>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });

  test('It renders a FormField with postFieldContent', () => {
    const testContent = <span data-testid="test-content">Test Content</span>;
    render(
      <FormField id="ff-1" name="testName" postFieldContent={testContent}>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });

  test('It renders a FormField with a red error', () => {
    const testError = 'error-1';
    render(
      <FormField id="ff-1" name="testName" error={testError}>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByRole('textbox')).toBeInvalid();
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(testError);
  });

  test('It renders a FormField with a description', () => {
    const testDesc = 'This is a test description.';
    render(
      <FormField id="ff-1" name="testName" description={testDesc}>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(testDesc);
  });

  test('It renders a required FormField', () => {
    const testName = 'test-field-name-4';
    const testLabel = 'test-label-3';
    render(
      <FormField id="ff-1" name={testName} label={testLabel} required>
        <TextInput />
      </FormField>,
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('name', testName);
    expect(screen.getByRole('textbox')).toHaveAccessibleName(expect.stringContaining(testLabel));
    expect(screen.getByRole('textbox')).toHaveAccessibleName(expect.stringContaining('*'));
  });
});
