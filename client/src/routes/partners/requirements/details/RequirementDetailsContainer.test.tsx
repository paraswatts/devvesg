import { screen, waitFor } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { RequirementDetailsContainer } from 'src/routes/partners/requirements/details/RequirementDetailsContainer';

jest.mock('src/common/forms/SingleSelectInput.tsx');
jest.mock('src/common/forms/SelectOption.tsx');

jest.mock('src/routes/partners/requirements/RequirementNavigation', () => ({
  RequirementNavigation: () => null,
}));

describe('RequirementDetailsContainer', () => {
  const renderPage = testRenderer(
    <I18nextProvider i18n={i18n}>
      <RequirementDetailsContainer />
    </I18nextProvider>,
  );

  test('it renders', async () => {
    renderPage();

    await waitFor(async () => {
      expect(screen.getByLabelText('Client Name')).toHaveTextContent('Client 1');
    });
    expect(screen.getByLabelText('ESG Initiative')).toHaveTextContent('Initiative 1');
    expect(screen.getByLabelText('Project Type')).toHaveTextContent('Project Type 1');
    expect(screen.getByLabelText('Requirement')).toHaveTextContent('Project 1');
    expect(screen.getByLabelText('Start Date')).toHaveTextContent('Jan 1, 2000');
    expect(screen.getByLabelText('End Date')).toHaveTextContent('Feb 1, 2000');
    expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('NOT_STARTED');

    expect(screen.getByRole('link', { name: 'https://client.com' })).toHaveAttribute('href', 'https://client.com');
    expect(screen.getByRole('link', { name: 'client@client.com' })).toHaveAttribute('href', 'mailto:client@client.com');
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://linkedin.com');
    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute('href', 'https://twitter.com');
    expect(screen.getByText('5555555555')).toBeInTheDocument();
  });
});
