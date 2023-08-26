import { screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';

import { AdminNftReadonlyViewContainer } from './AdminNftReadonlyViewContainer';

describe('NFT Table renders', () => {
  const nft = {
    uuid: "",
    assetName: "",
    assetReferenceUrlRaw: "",
    assetReferenceUrlHash: "",
    assetDescription: "",
    assetReferenceThumbnails: [],
    nftType: "",
    amount: "",
    creditCount: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    creator: "",
    artist: "",
    forSale: "",
    salePrice: "",
    saleCurrency: "",
    saleDescription: "",
    saleLocation: "",
    saleLink: "",
    methodology: "",
    projectType: "",
    projectFromDate: "",
    projectToDate: "",
    projectName: "",
    projectDescription: "",
    projectActivity: "",
    projectCode: "",
    projectId: "",
    projectBatchId: "",
    projectTicker: "",
    projectStandard: "",
    projectVintage: "",
    projectVerifier: "",
    projectValidator: "",
    geography: "",
    locationCoordinates: "",
    creditType: "",
    publicRegistry: "",
    publicRegistryLink: "",
    mintId: "",
    notes: "",
    saleReceiptUri: "",
    nftClientName: "",
  };

  const renderTest = testRenderer(
    <I18nextProvider i18n={i18n}>
      <AdminNftReadonlyViewContainer nft={nft} />
    </I18nextProvider>,
  );
  test('Table renders correctly', async () => {
    renderTest();
    expect(await screen.findAllByRole('table')).toHaveLength(1);
  });

  test('Verify table text contents, Its render', async () => {
    renderTest();
    expect(screen.getByText(/Credit Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Vintage/i)).toBeInTheDocument();
    expect(screen.getByText(/^Number Of credits/)).toBeInTheDocument();
    expect(screen.getByText(/Project Name/i)).toBeInTheDocument();
  });
});
