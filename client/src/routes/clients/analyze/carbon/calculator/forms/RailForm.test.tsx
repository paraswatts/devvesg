import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { RailForm } from 'src/routes/clients/analyze/carbon/calculator/forms/RailForm';

describe('RailForm', () => {
  const onChange = jest.fn();
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <RailForm onChange={onChange} />
    </I18nextProvider>,
  );
  test('it calculates the total carbon', async () => {
    renderTest();

    const milesInput = screen.getByRole('textbox', { name: /^Average annual rail travel in miles/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on rail travel usage in tCO₂ (tons carbon dioxide)',
    });

    expect(total).toHaveValue('0');

    userEvent.type(milesInput, '10000');

    expect(total).toHaveValue('1.1');
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(1.14);

    userEvent.clear(milesInput);

    expect(total).toHaveValue('0');
    expect(onChange).toHaveBeenLastCalledWith(0);
  });
});
