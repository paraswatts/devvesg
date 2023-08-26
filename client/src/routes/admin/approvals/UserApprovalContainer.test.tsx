import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';

import { Api } from 'src/api';
import { MockUser } from 'src/common/mocks/MockUser';
import { UserApprovalContainer } from 'src/routes/admin/approvals/UserApprovalContainer';

describe('UserApprovalContainer', () => {
  test('it renders and approves', async () => {
    jest.spyOn(Api.admin.user, 'unapproved').mockResolvedValue({ data: [MockUser as any] });
    jest.spyOn(Api.admin.user, 'approve').mockResolvedValue({ data: MockUser as any });
    render(<UserApprovalContainer />, { wrapper: MemoryRouter });
    await waitFor(() => expect(screen.getByTestId('ApprovalSelect')).toBeVisible());
    const select = screen.getByTestId('ApprovalSelect');
    userEvent.selectOptions(select, 'Approved');
    await waitFor(() => expect(Api.admin.user.approve).toHaveBeenCalledTimes(1));
    expect(Api.admin.user.approve).toHaveBeenCalled();
  });
});
