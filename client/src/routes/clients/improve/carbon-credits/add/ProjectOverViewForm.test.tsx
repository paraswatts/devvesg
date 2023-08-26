import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import i18n from 'src/mocks/i18nForTests';
import { ProjectOverViewForm } from 'src/routes/clients/improve/carbon-credits/add/ProjectOverViewForm';

describe('ProjectOverViewForm', () => {
  test('it renders and validates and submits', async () => {
    const handleNext = jest.fn();
    const handleBack = jest.fn();
    const defaultValues = {
      projectName: 'Carbon',
      projectDescription: 'Test',
      projectActivity: 'Activity',
      projectStartDate: '10-11-2022',
      projectEndDate: '10-11-2022',
    };
    render(
      <I18nextProvider i18n={i18n}>
        <ProjectOverViewForm
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
    const projectName = screen.getByRole('textbox', { name: /^Project Name/ });
    const projectDescription = screen.getByRole('textbox', { name: /^Project Description/ });
    const projectActivity = screen.getByRole('textbox', { name: /^Project Activity/ });
    const projectStartDate = screen.getByRole('textbox', { name: /^Project Start Date/ });
    const projectEndDate = screen.getByRole('textbox', { name: /^Project End Date/ });

    fireEvent.click(submitButton);
    userEvent.type(projectName, 'Energy Efficiency');
    userEvent.type(projectDescription, 'Project Description');
    userEvent.type(projectActivity, 'Project Activity');
    userEvent.type(projectStartDate, '12-29-1990');
    userEvent.type(projectEndDate, '12-29-1990');

    expect(submitButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    userEvent.click(submitButton);
    userEvent.click(backButton);
  });
});
