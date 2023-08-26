import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GraphQLHandlerInfo } from 'msw/lib/types/handlers/GraphQLHandler';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { server } from 'src/mocks/server';
import { CarbonImpactContainer } from 'src/routes/clients/analyze/carbon/impact/CarbonImpactContainer';

describe('CarbonImpactContainer', () => {
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <CarbonImpactContainer />
    </I18nextProvider>,
  );

  test('it displays the loaded carbon impact', async () => {
    renderTest();
    expect(await screen.findByText('12,345')).toBeInTheDocument();
    expect(await screen.findByText('01/01/2000')).toBeInTheDocument();
  });

  test('it updates the carbon impact', async () => {
    let fetchCalledCounter = 0;
    let createCalledCounter = 0;
    server.events.on('request:match', (req) => {
      if ((req.body as GraphQLHandlerInfo).operationName === 'GetLatestFootprint') {
        fetchCalledCounter++;
      }
      if ((req.body as GraphQLHandlerInfo).operationName === 'ClientFootprintCreate') {
        createCalledCounter++;
      }
    });

    renderTest();
    const input = screen.getByRole('textbox', {
      name: 'Average annual tons of CO₂ emissions (if known) Enter number of known tons of CO2 emissions',
    });
    const button = screen.getByRole('button', { name: 'Save Result' });
    await waitFor(async () => expect(fetchCalledCounter).toBe(1));
    userEvent.type(input, '9876543.21');
    userEvent.click(button);
    await waitFor(async () => expect(createCalledCounter).toBe(1));
    expect(fetchCalledCounter).toBe(1);
  });

  test('it validates the carbon impact form', async () => {
    renderTest();
    const input = screen.getByRole('textbox', {
      name: 'Average annual tons of CO₂ emissions (if known) Enter number of known tons of CO2 emissions',
    });
    const button = screen.getByRole('button', { name: 'Save Result' });

    expect(input).toBeValid();
    userEvent.click(button);
    await waitFor(async () => expect(input).not.toBeValid());
    expect(button).toBeDisabled();
    userEvent.type(input, '-1');
    await waitFor(async () => expect(input).not.toBeValid());
    expect(button).toBeDisabled();
    userEvent.clear(input);
    userEvent.type(input, 'asdf');
    await waitFor(async () => expect(input).not.toBeValid());
    expect(button).toBeDisabled();
    userEvent.clear(input);
    userEvent.type(input, '1');
    await waitFor(async () => expect(input).toBeValid());
    expect(button).toBeEnabled();
  });

  test('it should have a call to action to calculate carbon impact', () => {
    renderTest();
    expect(screen.getByRole('link', { name: "Don't know your carbon impact? Click here" })).toHaveAttribute(
      'href',
      '/clients/mock-client-uuid/analyze/carbon/calculator',
    );
  });

  test('it should have a call to action to reduce impact', () => {
    renderTest();
    const links = screen.getAllByRole('link', { name: 'Reduce Impact' });
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/clients/mock-client-uuid/improve/reduce-impact');
    });
  });
});
