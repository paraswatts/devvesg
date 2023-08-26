import { useState } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberFmt, numberFmt, useNumberFmt } from 'src/common/formatters/NumberFmt';
import { testRenderer } from 'src/mocks/renderer';

describe('NumberFmt component', () => {
  test('formats a number', () => {
    const renderPage = testRenderer(<NumberFmt value={1000} />);
    renderPage();
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  test('accepts min and max digits', () => {
    const renderPage = testRenderer(
      <>
        <span>
          <NumberFmt value={1000.1} minimumFractionDigits={3} />
        </span>
        <span>
          <NumberFmt value={1000.12345} maximumFractionDigits={2} />
        </span>
      </>,
    );
    renderPage();
    expect(screen.getByText('1,000.100')).toBeInTheDocument();
    expect(screen.getByText('1,000.12')).toBeInTheDocument();
  });

  test('renders a fallback if no value is provided', () => {
    const renderPage = testRenderer(<NumberFmt fallback="fallback text" />);
    renderPage();

    expect(screen.getByText('fallback text')).toBeInTheDocument();
  });
});

const Component = () => {
  const [numberToFormat, setNumberToFormat] = useState<number | undefined>(12345);
  const formatter = useNumberFmt();
  return (
    <div>
      {formatter(numberToFormat)}
      {formatter(numberToFormat) === '' && 'Nothing to render'}
      <button type="button" onClick={() => setNumberToFormat(45678)}>
        Change Number
      </button>
      <button type="button" onClick={() => setNumberToFormat(undefined)}>
        Empty Number
      </button>
    </div>
  );
};
const renderDummyComponent = testRenderer(<Component />);

describe('useNumberFmt hook', () => {
  test('formats a number', () => {
    renderDummyComponent();
    expect(screen.getByText('12,345')).toBeInTheDocument();
  });

  test('updates number on render', async () => {
    renderDummyComponent();
    const changeNumberButton = screen.getByText('Change Number');
    expect(screen.getByText('12,345')).toBeInTheDocument();
    userEvent.click(changeNumberButton);
    expect(screen.getByText('45,678')).toBeInTheDocument();
  });

  test('returns empty string if there is no input', async () => {
    renderDummyComponent();
    const emptyNumberButton = screen.getByText('Empty Number');
    expect(screen.getByText('12,345')).toBeInTheDocument();
    expect(screen.queryByText('Nothing to render')).toBeNull();
    userEvent.click(emptyNumberButton);
    expect(screen.getByText('Nothing to render')).toBeInTheDocument();
  });
});

describe('numberFmt function', () => {
  test('formats a number', () => {
    const formattedNumber = numberFmt(121212);
    expect(formattedNumber).toBe('121,212');
  });

  test('formats a date with min and max fraction digits', () => {
    const formattedNumberMin = numberFmt(100.1, { minimumFractionDigits: 5 });
    const formattedNumberMax = numberFmt(100.12345, { maximumFractionDigits: 2 });
    expect(formattedNumberMin).toBe('100.10000');
    expect(formattedNumberMax).toBe('100.12');
  });

  test('returns empty string with no input', () => {
    const formattedNumber = numberFmt();
    expect(formattedNumber).toBe('');
  });
});
