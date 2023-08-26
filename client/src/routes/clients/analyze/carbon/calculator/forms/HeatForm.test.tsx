import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { HeatForm } from 'src/routes/clients/analyze/carbon/calculator/forms/HeatForm';

describe('HeatForm', () => {
  const onChange = jest.fn();
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <HeatForm onChange={onChange} />
    </I18nextProvider>,
  );
  test('it calculates the total carbon', async () => {
    renderTest();

    const oilInput = screen.getByRole('textbox', { name: /^Average gallons of oil used per year/ });
    const propaneInput = screen.getByRole('textbox', { name: /^Average gallons of propane used per year/ });
    const gasInput = screen.getByRole('textbox', { name: /^Average cCF of natural gas used per year/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on heating usage in tCO₂ (tons carbon dioxide)',
    });

    expect(total).toHaveValue('0');

    userEvent.type(oilInput, '1000');
    expect(total).toHaveValue('10.2');
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(10.16);

    userEvent.type(propaneInput, '1000');
    expect(total).toHaveValue('15.9');

    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(15.92);

    userEvent.type(gasInput, '1000');
    expect(total).toHaveValue('21.2');
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(21.23);

    userEvent.clear(oilInput);
    userEvent.clear(propaneInput);
    userEvent.clear(gasInput);

    expect(total).toHaveValue('0');
    expect(onChange).toHaveBeenLastCalledWith(0);
  });
});
