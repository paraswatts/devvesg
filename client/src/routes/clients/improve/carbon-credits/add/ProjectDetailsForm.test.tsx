import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import i18n from 'src/mocks/i18nForTests';
import { ProjectDetailsForm } from 'src/routes/clients/improve/carbon-credits/add/ProjectDetailsForm';

describe('ProjectDetailsForm', () => {
  test('it renders and validates and submits', async () => {
    const handleNext = jest.fn();
    const handleBack = jest.fn();
    const defaultValues = {
      geography: 'geography',
      location: 'location',
      projectId: 'projectId',
      projectBatchId: 'projectBatchId',
      projectCode: 'projectCode',
      projectTicker: 'projectTicker',
    };
    render(
      <I18nextProvider i18n={i18n}>
        <ProjectDetailsForm
          handleBack={handleBack}
          handleNext={handleNext}
          loading={true}
          defaultValues={defaultValues}
        />
      </I18nextProvider>,
      { wrapper: MemoryRouter },
    );
    const submitButton = screen.getByRole('button', { name: 'Next' });
    const backButton = screen.getByRole('button', { name: 'Back' });

    const geography = screen.getByRole('textbox', { name: /^Geography/ });
    const location = screen.getByRole('textbox', { name: /^Location/ });
    const projectId = screen.getByRole('textbox', { name: /^Project Id/ });
    const projectBatchId = screen.getByRole('textbox', { name: /^Project Batch Id/ });
    const projectCode = screen.getByRole('textbox', { name: /^Project Code/ });
    const projectTicker = screen.getByRole('textbox', { name: /^Project Ticker/ });

    userEvent.type(geography, 'Inner mongolia autonomous region');
    userEvent.type(location, '120°17’52’’~121°37’50’‘E and 47°35’21’’~48 10’13’’N');
    userEvent.type(projectId, 'VCS 1529');
    userEvent.type(projectBatchId, 'Batch ID 0001');
    userEvent.type(projectCode, 'LCO2S');
    userEvent.type(projectTicker, 'LCO2-MONG');

    expect(submitButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    userEvent.click(submitButton);
    userEvent.click(backButton);
  });
});
