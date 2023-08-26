import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { VehicleForm } from 'src/routes/clients/analyze/carbon/calculator/forms/VehicleForm';

describe('VehicleForm', () => {
  const onChange = jest.fn();
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <VehicleForm onChange={onChange} />
    </I18nextProvider>,
  );

  test('it calculates the total carbon', async () => {
    renderTest();

    const dieselUsageInput = screen.getByRole('textbox', { name: /^Average annual diesel usage/ });
    const dieselMilesInput = screen.getByRole('textbox', { name: /^Annual total miles driven using diesel/ });
    const gasUsageInput = screen.getByRole('textbox', { name: /^Average annual gasoline usage/ });
    const gasMilesInput = screen.getByRole('textbox', { name: /^Annual total miles driven using gasoline/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on vehicle usage in tCO₂ (tons carbon dioxide)',
    });

    expect(total).toHaveValue('0');

    userEvent.type(dieselUsageInput, '30');
    userEvent.type(dieselMilesInput, '10000');

    await waitFor(async () => expect(total).toHaveValue('3.4'));
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(3.4);

    userEvent.type(gasUsageInput, '30');
    userEvent.type(gasMilesInput, '10000');

    await waitFor(async () => expect(total).toHaveValue('6.3'));
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(6.33);

    userEvent.clear(dieselUsageInput);
    userEvent.clear(dieselMilesInput);
    userEvent.clear(gasUsageInput);
    userEvent.clear(gasMilesInput);

    await waitFor(async () => expect(total).toHaveValue('0'));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  test('it validates diesel fields as one', async () => {
    renderTest();

    const usageInput = screen.getByRole('textbox', { name: /^Average annual diesel usage/ });
    const milesInput = screen.getByRole('textbox', { name: /^Annual total miles driven using diesel/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on vehicle usage in tCO₂ (tons carbon dioxide)',
    });

    expect(usageInput).toBeValid();
    expect(milesInput).toBeValid();
    expect(total).toHaveValue('0');

    userEvent.type(usageInput, '123');
    expect(usageInput).toBeValid();
    await waitFor(async () => expect(milesInput).not.toBeValid());
    expect(total).toHaveValue('0');

    userEvent.clear(usageInput);
    expect(usageInput).toBeValid();
    await waitFor(async () => expect(milesInput).toBeValid());
    expect(total).toHaveValue('0');

    userEvent.type(milesInput, '123');
    await waitFor(async () => expect(usageInput).not.toBeValid());
    expect(milesInput).toBeValid();
    expect(total).toHaveValue('0');
  });

  test('it validates gas fields as one', async () => {
    renderTest();

    const usageInput = screen.getByRole('textbox', { name: /^Average annual gasoline usage/ });
    const milesInput = screen.getByRole('textbox', { name: /^Annual total miles driven using gasoline/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on vehicle usage in tCO₂ (tons carbon dioxide)',
    });

    expect(usageInput).toBeValid();
    expect(milesInput).toBeValid();
    expect(total).toHaveValue('0');

    userEvent.type(usageInput, '123');
    expect(usageInput).toBeValid();
    await waitFor(async () => expect(milesInput).not.toBeValid());
    expect(total).toHaveValue('0');

    userEvent.clear(usageInput);
    expect(usageInput).toBeValid();
    await waitFor(async () => expect(milesInput).toBeValid());
    expect(total).toHaveValue('0');

    userEvent.type(milesInput, '123');
    await waitFor(async () => expect(usageInput).not.toBeValid());
    expect(milesInput).toBeValid();
    expect(total).toHaveValue('0');
  });
});
