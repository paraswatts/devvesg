import { render, screen, waitFor } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { ApprovalStatuses } from 'src/api';
import { MockPartner } from 'src/common/mocks/MockPartner';
import { MockUser } from 'src/common/mocks/MockUser';
import i18n from 'src/mocks/i18nForTests';
import { PartnerRouter } from 'src/routes/partners/PartnerRouter';

let mockUseUser = jest.fn();
jest.mock('src/common/providers/UserProvider', () => ({
  useUser: () => mockUseUser(),
}));

jest.unmock('src/routes/partners/PartnerProvider');
let mockUsePartner = jest.fn();
jest.mock('src/routes/partners/PartnerProvider', () => ({
  PartnerProvider: ({ children }: any) => <>{children}</>,
  usePartner: () => mockUsePartner(),
}));

// Don't render any children in the content area so we don't test child route dependencies
jest.mock('src/common/layout/SideNavLayout', () => {
  return {
    ...jest.requireActual('src/common/layout/SideNavLayout'),
    SideNavContentContainer: () => null,
  };
});

const renderComponent = () => {
  render(
    <I18nextProvider i18n={i18n}>
      <PartnerRouter />
    </I18nextProvider>,
    { wrapper: MemoryRouter },
  );
};

describe('PartnerRouter', () => {
  describe('unapproved users and approved partners', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({ user: { ...MockUser, approvalStatus: ApprovalStatuses.PENDING } });
      mockUsePartner.mockReturnValue({ partner: MockPartner });
    });

    test('it shows a confirmation screen if a partner is not confirmed', async () => {
      renderComponent();
      await waitFor(async () => {
        expect(screen.getByText('Thank you for registering with DevvESG Platform')).toBeInTheDocument();
      });
    });
  });

  describe('approved users and unapproved partners', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({ user: MockUser });
      mockUsePartner.mockReturnValue({ partner: { ...MockPartner, approvalStatus: ApprovalStatuses.PENDING } });
    });

    test('it says under review', async () => {
      renderComponent();
      await waitFor(async () => {
        expect(screen.getByText('Thank you for registering with DevvESG Platform')).toBeInTheDocument();
      });
    });
  });

  describe('approved users and approved partners', () => {
    beforeEach(() => {
      mockUseUser.mockReturnValue({ user: MockUser });
      mockUsePartner.mockReturnValue({ partner: MockPartner });
    });

    test('it shows navigation', async () => {
      renderComponent();
      await waitFor(async () => {
        expect(screen.getByRole('link', { name: 'Requirements' })).toBeInTheDocument();
      });
      expect(screen.getByRole('link', { name: 'Requests' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    });
  });
});
