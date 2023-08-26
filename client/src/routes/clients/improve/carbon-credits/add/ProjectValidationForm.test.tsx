import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import i18n from 'src/mocks/i18nForTests';
import { ProjectValidationForm } from 'src/routes/clients/improve/carbon-credits/add/ProjectValidationForm';
describe('ProjectValidationForm', () => {
  test('it renders and validates and submits', async () => {
    const handleNext = jest.fn();
    const handleBack = jest.fn();
    const defaultValues = {
      validator: 'validator',
      verifier: 'verifier',
      carbonCreditStandard: 'carbonCreditStandard',
      methodology: 'methodology',
      projectType: 'projectType',
      registry: 'registry',
      linkToRegistry: 'linkToRegistry',
    };
    render(
      <I18nextProvider i18n={i18n}>
        <ProjectValidationForm
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

    const validator = screen.getByRole('textbox', { name: /^Validator/ });
    const verifier = screen.getByRole('textbox', { name: /^Verifier/ });
    const carbonCreditStandard = screen.getByRole('textbox', { name: /^Carbon Credit Standard/ });
    const methodology = screen.getByRole('textbox', { name: /^Methodology/ });
    const projectType = screen.getByRole('textbox', { name: /^Project Type/ });
    const registry = screen.getByRole('textbox', { name: /^Registry/ });
    const linkToRegistry = screen.getByRole('textbox', { name: /^Link To Registry/ });

    userEvent.type(validator, 'China Environmental');
    userEvent.type(verifier, 'Verra');
    userEvent.type(carbonCreditStandard, 'VER VCS');
    userEvent.type(methodology, 'VM0018');
    userEvent.type(projectType, 'VM0018');
    userEvent.type(registry, 'Verra');
    userEvent.type(linkToRegistry, 'https://registry.verra.org/app/projectDetail/VCS/929');

    expect(submitButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    userEvent.click(submitButton);
    userEvent.click(backButton);
  });
});
