import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { Api } from 'src/api';
import i18n from 'src/mocks/i18nForTests';
import { CreditInformationForm } from 'src/routes/clients/improve/carbon-credits/add/CreditInformationForm';

describe('CreditInformationForm', () => {
  test('it renders and validates and submits', async () => {
    const handleNext = jest.fn();
    const handleBack = jest.fn();
    const defaultValues = {
      creditType: { uuid: 'da144019-6ec9-4a8a-9ea4-a66563fffd12' },
      carbonCount: '10000',
      vintage: '2014',
      creditTypeUuid: 'da144019-6ec9-4a8a-9ea4-a66563fffd12',
    };
    jest.spyOn(Api.creditType, 'list').mockResolvedValue({
      data: [
        {
          uuid: 'f03eb2df-5af9-4600-91f0-d19b6b801c9d',
          name: 'Carbon',
          description: 'Credits from any type of project offsetting carbon (land, mangrove, burning, soil, etc).',
        },
      ],
    });

    render(
      <I18nextProvider i18n={i18n}>
        <CreditInformationForm
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
    const type = screen.getByRole('combobox', { name: /^Type/ });
    expect(type).toBeInTheDocument();
    const vintage = screen.getByRole('spinbutton', { name: /^Vintage/ });
    const numberOfCarbonCredits = screen.getByRole('spinbutton', { name: /^Number Of Credits/ });

    userEvent.type(vintage, '2014');
    userEvent.type(numberOfCarbonCredits, '20000');

    expect(submitButton).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    userEvent.click(submitButton);
    userEvent.click(backButton);
  });
});
