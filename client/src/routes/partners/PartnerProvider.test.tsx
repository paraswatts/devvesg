import { PropsWithChildren } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Api } from 'src/api';
import { MockPartner } from 'src/common/mocks/MockPartner';
import { PartnerProvider, usePartner } from 'src/routes/partners/PartnerProvider';

jest.unmock('src/routes/partners/PartnerProvider.tsx');

const TestWrapper = ({ children }: PropsWithChildren<any>) => (
  <MemoryRouter initialEntries={[`/${MockPartner.uuid}`]}>
    <Routes>
      <Route path="/:partnerUuid" element={<PartnerProvider>{children}</PartnerProvider>} />
    </Routes>
  </MemoryRouter>
);

const TestComponent = () => {
  const { partner, setPartner } = usePartner();
  return (
    <div>
      <h1>{partner.name}</h1>
      <button type="button" onClick={() => setPartner({ name: 'Foo Baz' })}>
        Update
      </button>
    </div>
  );
};

describe('PartnerProvider', () => {
  beforeEach(() => {
    jest.spyOn(Api.partner, 'fetchPartner').mockResolvedValueOnce({ data: MockPartner as any });
  });

  test('it provides a partner', async () => {
    render(<TestComponent />, { wrapper: TestWrapper });
    await waitFor(async () => {
      expect(screen.getByRole('heading', { name: MockPartner.name })).toBeInTheDocument();
    });
  });

  test('it updates a partner', async () => {
    render(<TestComponent />, { wrapper: TestWrapper });

    await waitFor(async () => {
      expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    });
    userEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(screen.getByRole('heading', { name: 'Foo Baz' })).toBeInTheDocument();
  });
});
