import { useState } from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';
import { DisconnectPartnerModal } from 'src/routes/clients/initiatives/DisconnectPartnerModal';

const onConfirm = jest.fn();
const onCancel = jest.fn();

const Component = () => {
  const [loading, setLoading] = useState(false);
  const handleConfirm = (reason: string) => {
    setLoading(true);
    onConfirm(reason);
  };
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <DisconnectPartnerModal onCancel={onCancel} onConfirm={handleConfirm} loading={loading} />
      </I18nextProvider>
    </div>
  );
};

const validInput = 'valid';
let invalidInput = 'a';
for (let i = 0; i < 361; i++) {
  invalidInput = invalidInput + 'a';
}

const renderDummyComponent = testRenderer(<Component />);

describe('DisconnectPartnerModal', () => {
  test('renders the form', () => {
    renderDummyComponent();
    expect(
      screen.getByText('Are you sure you want to disconnect from the partner? This action cannot be undone.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /^Reason */,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Nevermind' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  test('validates the form', async () => {
    renderDummyComponent();
    const submitButton = screen.getByRole('button', { name: 'Confirm' });
    const reasonField = screen.getByRole('textbox', { name: /^Reason */ });
    userEvent.click(submitButton);

    await waitFor(async () => {
      expect(reasonField).toBeInvalid();
    });
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    userEvent.type(reasonField, validInput);
    await waitFor(async () => {
      expect(reasonField).toBeValid();
    });
    expect(submitButton).toBeEnabled();

    userEvent.type(reasonField, invalidInput);
    await waitFor(async () => {
      expect(reasonField).toBeInvalid();
    });
    expect(screen.getByText('Must be 360 characters or less')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('submits the form and updates the loading state', async () => {
    renderDummyComponent();
    const submitButton = screen.getByRole('button', { name: 'Confirm' });
    const reasonField = screen.getByRole('textbox', { name: /^Reason */ });

    userEvent.type(reasonField, validInput);
    await waitFor(async () => {
      expect(reasonField).toBeValid();
    });
    expect(submitButton).toBeEnabled();

    userEvent.click(submitButton);
    await waitFor(async () => {
      expect(submitButton).toBeDisabled();
    });
    expect(onConfirm).toHaveBeenCalledWith(validInput);
  });

  test('calls onCancel when cancelled', async () => {
    renderDummyComponent();
    const cancelButton = screen.getByRole('button', { name: 'Nevermind' });

    userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
