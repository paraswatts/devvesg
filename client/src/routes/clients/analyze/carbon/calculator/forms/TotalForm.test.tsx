import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { TotalForm } from 'src/routes/clients/analyze/carbon/calculator/forms/TotalForm';

describe('TotalForm', () => {
  const onSubmit = jest.fn();
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <TotalForm onSubmit={onSubmit} />
    </I18nextProvider>,
  );

  test('it broadcasts a submit event', async () => {
    renderTest();
    userEvent.click(screen.getByRole('button', { name: 'Save Result' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test('it supports disabling the submit button', async () => {
    const { rerender } = renderTest();
    expect(screen.getByRole('button', { name: 'Save Result' })).toBeEnabled();
    rerender(
      <I18nextProvider i18n={i18n}>
        <TotalForm onSubmit={onSubmit} disabled />
      </I18nextProvider>,
    );
    expect(screen.getByRole('button', { name: 'Save Result' })).toBeDisabled();
    rerender(
      <I18nextProvider i18n={i18n}>
        <TotalForm onSubmit={onSubmit} loading />
      </I18nextProvider>,
    );
    expect(screen.getByRole('button', { name: 'Save Result' })).toBeDisabled();
    rerender(
      <I18nextProvider i18n={i18n}>
        <TotalForm onSubmit={onSubmit} />
      </I18nextProvider>,
    );
    expect(screen.getByRole('button', { name: 'Save Result' })).toBeEnabled();
  });

  test('it contains a reduce impact call to action', async () => {
    renderTest();
    expect(screen.getByRole('link', { name: 'Reduce Impact' })).toHaveAttribute(
      'href',
      '/clients/mock-client-uuid/improve/reduce-impact',
    );
  });
});
