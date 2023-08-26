import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { NftForm } from 'src/routes/clients/improve/carbon-credits/add/NftForm';

describe('NftForm', () => {
  test('it renders and validates and submits', async () => {
    const onSubmit = jest.fn();
    const closeNftForm = jest.fn();
    render(<NftForm onSubmit={onSubmit} closeNftForm={closeNftForm} loading={true} />, { wrapper: MemoryRouter });
  });
});
