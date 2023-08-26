import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { ShippingForm } from 'src/routes/clients/analyze/carbon/calculator/forms/ShippingForm';

describe('ShippingForm', () => {
  const onChange = jest.fn();
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <ShippingForm onChange={onChange} />
    </I18nextProvider>,
  );

  test('it calculates the total carbon', async () => {
    renderTest();

    const airInput = screen.getByRole('textbox', { name: /^Average annual number of shipments for air/ });
    const airWeightInput = screen.getByRole('textbox', {
      name: 'Average air shipment weight in pounds (lbs) Average shipment weight',
    });
    const airDistanceInput = screen.getByRole('textbox', { name: /^Average air shipment distance in miles/ });
    const groundInput = screen.getByRole('textbox', {
      name: 'Average annual number of shipments for ground (truck) Number of shipments',
    });
    const groundWeightInput = screen.getByRole('textbox', {
      name: 'Average ground shipment weight in pounds (lbs) Average shipment weight',
    });
    const groundDistanceInput = screen.getByRole('textbox', { name: /^Average ground shipment distance in miles/ });
    const oceanInput = screen.getByRole('textbox', { name: /^Average annual number of shipments for ocean/ });
    const oceanWeightInput = screen.getByRole('textbox', {
      name: 'Average ocean shipment weight in pounds (lbs) Average shipment weight',
    });
    const oceanDistanceInput = screen.getByRole('textbox', { name: /^Average ocean shipment distance in miles/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on shipping usage in tCO₂ (tons carbon dioxide)',
    });

    expect(total).toHaveValue('0');

    userEvent.type(airInput, '1000');
    userEvent.type(airWeightInput, '10');
    userEvent.type(airDistanceInput, '1000');

    await waitFor(async () => expect(total).toHaveValue('5.3'));
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(5.32);

    userEvent.type(groundInput, '1000');
    userEvent.type(groundWeightInput, '25');
    userEvent.type(groundDistanceInput, '1000');

    await waitFor(async () => expect(total).toHaveValue('7.7'));
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(7.73);

    userEvent.type(oceanInput, '1000');
    userEvent.type(oceanWeightInput, '100');
    userEvent.type(oceanDistanceInput, '5000');

    await waitFor(async () => expect(total).toHaveValue('16.1'));
    expect(onChange.mock.calls[onChange.mock.calls.length - 1][0]).toBeCloseTo(16.08);

    userEvent.clear(airInput);
    userEvent.clear(airWeightInput);
    userEvent.clear(airDistanceInput);
    userEvent.clear(groundInput);
    userEvent.clear(groundWeightInput);
    userEvent.clear(groundDistanceInput);
    userEvent.clear(oceanInput);
    userEvent.clear(oceanWeightInput);
    userEvent.clear(oceanDistanceInput);

    await waitFor(async () => expect(total).toHaveValue('0'));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  test('it validates air fields as one', async () => {
    renderTest();

    const countInput = screen.getByRole('textbox', { name: /^Average annual number of shipments for air/ });
    const weightInput = screen.getByRole('textbox', {
      name: 'Average air shipment weight in pounds (lbs) Average shipment weight',
    });
    const distanceInput = screen.getByRole('textbox', { name: /^Average air shipment distance in miles/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on shipping usage in tCO₂ (tons carbon dioxide)',
    });

    await validateAll();
    userEvent.type(countInput, '123');

    expect(countInput).toBeValid();
    await waitFor(async () => [weightInput, distanceInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(countInput);
    await validateAll();

    userEvent.type(weightInput, '123');
    expect(weightInput).toBeValid();
    await waitFor(async () => [countInput, distanceInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(weightInput);
    await validateAll();

    userEvent.type(distanceInput, '123');
    expect(distanceInput).toBeValid();
    await waitFor(async () => [countInput, weightInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(distanceInput);
    await validateAll();

    async function validateAll() {
      await waitFor(async () => [countInput, weightInput, distanceInput].forEach((input) => expect(input).toBeValid()));
      expect(total).toHaveValue('0');
    }
  });

  test('it validates ground fields as one', async () => {
    renderTest();

    const countInput = screen.getByRole('textbox', {
      name: 'Average annual number of shipments for ground (truck) Number of shipments',
    });
    const weightInput = screen.getByRole('textbox', {
      name: 'Average ground shipment weight in pounds (lbs) Average shipment weight',
    });
    const distanceInput = screen.getByRole('textbox', { name: /^Average ground shipment distance in miles/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on shipping usage in tCO₂ (tons carbon dioxide)',
    });

    await validateAll();
    userEvent.type(countInput, '123');

    expect(countInput).toBeValid();
    await waitFor(async () => [weightInput, distanceInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(countInput);
    await validateAll();

    userEvent.type(weightInput, '123');
    expect(weightInput).toBeValid();
    await waitFor(async () => [countInput, distanceInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(weightInput);
    await validateAll();

    userEvent.type(distanceInput, '123');
    expect(distanceInput).toBeValid();
    await waitFor(async () => [countInput, weightInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(distanceInput);
    await validateAll();

    async function validateAll() {
      await waitFor(async () => [countInput, weightInput, distanceInput].forEach((input) => expect(input).toBeValid()));
      expect(total).toHaveValue('0');
    }
  });

  test('it validates ocean fields as one', async () => {
    renderTest();

    const countInput = screen.getByRole('textbox', { name: /^Average annual number of shipments for ocean/ });
    const weightInput = screen.getByRole('textbox', {
      name: 'Average ocean shipment weight in pounds (lbs) Average shipment weight',
    });
    const distanceInput = screen.getByRole('textbox', { name: /^Average ocean shipment distance in miles/ });
    const total = screen.getByRole('textbox', {
      name: 'Carbon impact based on shipping usage in tCO₂ (tons carbon dioxide)',
    });

    await validateAll();
    userEvent.type(countInput, '123');

    expect(countInput).toBeValid();
    await waitFor(async () => [weightInput, distanceInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(countInput);
    await validateAll();

    userEvent.type(weightInput, '123');
    expect(weightInput).toBeValid();
    await waitFor(async () => [countInput, distanceInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(weightInput);
    await validateAll();

    userEvent.type(distanceInput, '123');
    expect(distanceInput).toBeValid();
    await waitFor(async () => [countInput, weightInput].forEach((input) => expect(input).not.toBeValid()));
    expect(total).toHaveValue('0');

    userEvent.clear(distanceInput);
    await validateAll();

    async function validateAll() {
      await waitFor(async () => [countInput, weightInput, distanceInput].forEach((input) => expect(input).toBeValid()));
      expect(total).toHaveValue('0');
    }
  });
});
