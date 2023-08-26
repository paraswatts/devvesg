import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { ElectricityForm } from 'src/routes/clients/analyze/carbon/calculator/forms/ElectricityForm';

describe('ElectricityForm', () => {
  const onChange = jest.fn();
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <ElectricityForm onChange={onChange} />
    </I18nextProvider>,
  );
  test('it calculates the total carbon', async () => {
    renderTest();

    const usageInput = screen.getByRole('textbox', {
      name: 'Average annual energy usage in kWh (kilowatt per hour) Enter the number of kWh used per year',
    });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on electricity usage in tCO₂ (tons carbon dioxide)',
    });

    expect(total).toHaveValue('0');

    userEvent.type(usageInput, '10000');

    expect(total).toHaveValue('4');
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(4.011);

    userEvent.clear(usageInput);

    expect(total).toHaveValue('0');
    expect(onChange).toHaveBeenLastCalledWith(0);
  });
});
