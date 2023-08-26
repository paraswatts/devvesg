import { cleanup, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import { NftSale } from 'src/interfaces';
import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';

import { AdminNftSaleContainer } from './AdminNftSaleContainer';

afterEach(() => {
  cleanup();
});

jest.mock('src/api/actions', () => {
  return {
    Api: {
      nft: {
        fetch: jest.fn(() =>
          Promise.resolve({
            data: {
              uuid: 'df76d8f7g8df',
              salePrice: '',
              saleLink: '',
              saleCurrency: '',
              saleLocation: '',
              saleDescription: '',
            },
          }),
        ),
      },
    },
  };
});

describe('AdminNftSaleContainer', () => {
  const func = jest.fn((data: NftSale) => {});
  const nftFullView = {
    uuid: 'df76d8f7g8df',
    saleLink: '',
    salePrice: '500',
    saleCurrency: '$',
    saleLocation: 'United State',
    saleDescription: '',
    assetReferenceThumbnails: '',
  };
  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <AdminNftSaleContainer nft={nftFullView} submitNFTSaleDetails={func} />
    </I18nextProvider>,
  );

  test('Check Sale NFT form render', () => {
    renderTest();
    const titleElement = screen.getByTestId('form-modal');
    expect(titleElement).toBeInTheDocument();
  });

  test('Check form button', () => {
    renderTest();
    const submit = screen.getByRole('button', { name: 'Sale' });
    const nevermind = screen.getByRole('button', { name: 'Nevermind' });
    expect(submit).toBeEnabled();
    expect(nevermind).toBeEnabled();
  });

  test('Check form elements', () => {
    renderTest();
    const salePrice = screen.getByText(/Sale Price/i);
    expect(salePrice).toBeInTheDocument();
    const saleLink = screen.getByText(/Sale Link/i);
    expect(saleLink).toBeInTheDocument();
    const saleCurrency = screen.getByText(/Sale Currency/i);
    expect(saleCurrency).toBeInTheDocument();
    const saleLocation = screen.getByText(/Sale Location/i);
    expect(saleLocation).toBeInTheDocument();
    const saleDescription = screen.getByText(/Sale Description/i);
    expect(saleDescription).toBeInTheDocument();
  });
});
