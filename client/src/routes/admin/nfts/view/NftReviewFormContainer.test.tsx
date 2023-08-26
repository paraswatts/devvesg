import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import { NftStatuses } from 'src/api';
import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';

import { NftReviewFormContainer } from './NftReviewFormContainer';
describe('Carbon credits review form renders', () => {
  let data = {
    nft: {
      status: 'Approved',
      notes: '',
    },
    onChange: jest.fn((event: any) => {}),
    backToList: jest.fn(() => {}),
    approve: jest.fn(() => {}),
    declined: jest.fn(() => {}),
    spinner: false,
  };
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <NftReviewFormContainer {...data} />
    </I18nextProvider>,
  );

  test('Review Form renders correctly with', () => {
    data.nft.status = NftStatuses.UNDER_REVIEW;
    renderTest();
    expect(screen.getByPlaceholderText(/Type comment here./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  test('Admin can mint NFT if status is Approved', () => {
    data.nft.status = NftStatuses.APPROVED;
    renderTest();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });
  test('Admin can Sale/Retire NFT if status is Owned', () => {
    data.nft.status = NftStatuses.OWNED;
    renderTest();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });
});
