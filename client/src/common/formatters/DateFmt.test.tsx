import { useState } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateFmt, dateFmt, useDateFmt } from 'src/common/formatters/DateFmt';
import { testRenderer } from 'src/mocks/renderer';

describe('DateFmt component', () => {
  test('formats a given date', () => {
    const date = new Date(2000, 0, 1);
    const renderPage = testRenderer(<DateFmt value={date} day="2-digit" month="2-digit" year="numeric" />);
    renderPage();
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
  });

  test('renders the provided fallback when there is no input', () => {
    const renderPage = testRenderer(<DateFmt fallback={<span>fallback text</span>} />);
    renderPage();
    expect(screen.getByText('fallback text')).toBeInTheDocument();
  });

  test('renders using the provided locale', () => {
    const date = new Date(2000, 0, 1);
    const renderPage = testRenderer(
      <DateFmt value={date} locale={'ko-KR'} day="2-digit" month="2-digit" year="numeric" />,
    );
    renderPage();
    expect(screen.getByText('2000. 01. 01.')).toBeInTheDocument();
  });
});

const Component = () => {
  const [dateToFormat, setDateToFormat] = useState<Date | undefined>(new Date(2000, 0, 1));
  const formatter = useDateFmt({ day: '2-digit', month: '2-digit', year: 'numeric' });
  return (
    <div>
      {formatter(dateToFormat)}
      {formatter(dateToFormat) === '' && 'Nothing to render'}
      <button type="button" onClick={() => setDateToFormat(new Date(2001, 0, 1))}>
        Change Date
      </button>
      <button type="button" onClick={() => setDateToFormat(undefined)}>
        Empty Date
      </button>
    </div>
  );
};
const renderDummyComponent = testRenderer(<Component />);

describe('useDateFmt hook', () => {
  test('formats a date', () => {
    renderDummyComponent();
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
  });

  test('updates date on render', async () => {
    renderDummyComponent();
    const changeDateButton = screen.getByText('Change Date');
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
    userEvent.click(changeDateButton);
    expect(screen.getByText('01/01/2001')).toBeInTheDocument();
  });

  test('returns empty string if there is no input', async () => {
    renderDummyComponent();
    const emptyDateButton = screen.getByText('Empty Date');
    expect(screen.getByText('01/01/2000')).toBeInTheDocument();
    expect(screen.queryByText('Nothing to render')).toBeNull();
    userEvent.click(emptyDateButton);
    expect(screen.getByText('Nothing to render')).toBeInTheDocument();
  });
});

describe('dateFmt function', () => {
  test('formats a date', () => {
    const formattedDate = dateFmt(new Date(2000, 0, 1), { day: '2-digit', month: '2-digit', year: 'numeric' });
    expect(formattedDate).toBe('01/01/2000');
  });

  test('formats a date with locale', () => {
    const formattedDate = dateFmt(new Date(2000, 0, 1), { day: '2-digit', month: '2-digit', year: 'numeric' }, 'ko-KR');
    expect(formattedDate).toBe('2000. 01. 01.');
  });

  test('returns empty string with no input', () => {
    const formattedDate = dateFmt();
    expect(formattedDate).toBe('');
  });
});
