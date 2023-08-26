import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { Api, ApprovalStatuses } from 'src/api';
import { MockPartner } from 'src/common/mocks/MockPartner';
import i18n from 'src/mocks/i18nForTests';
import { PartnerApprovalContainer } from 'src/routes/admin/approvals/PartnerApprovalContainer';

describe('PartnerApprovalContainer', () => {
  test('it renders and approves', async () => {
    jest.spyOn(Api.admin.partner, 'unapproved').mockResolvedValue({ data: [MockPartner] });
    jest.spyOn(Api.admin.partner, 'approve').mockResolvedValue({ data: MockPartner });
    render(
      <I18nextProvider i18n={i18n}>
        <PartnerApprovalContainer />
      </I18nextProvider>,
      { wrapper: MemoryRouter },
    );
    await waitFor(() => expect(screen.getByTestId('ApprovalSelect')).toBeVisible());
    const select = screen.getByTestId('ApprovalSelect');
    userEvent.selectOptions(select, ApprovalStatuses.APPROVED);
    await waitFor(() => expect(Api.admin.partner.approve).toHaveBeenCalledTimes(1));
    expect(Api.admin.partner.approve).toHaveBeenCalled();
  });
});
