

import { screen } from '@testing-library/react';

import { testRenderer } from 'src/mocks/renderer';

import { AdminNftViewContainer } from './AdminNftViewContainer';

const renderTest = testRenderer(<AdminNftViewContainer />);

jest.mock('src/api/actions', () => {
    const nftsData = {
        uuid: "fsdffdsdsds",
        assetName: "dsfdsfds",
        nftType: "sdffsd",
        amount: "266",
        creditCount: "23",
        assetReferenceUrlRaw: "http://hujyhdsfdfbdks.com/iksdfkbnksdbkf",
        projectName: "ABC",
        projectVintage: "fgsddsdfs",
        nftClientName: "dsfsdf",
        status: "Owned",
        createdAt: new Date(),
        notes: "sdfsdfdsfs"
    };
    return {
        Api: {
            nft: { view: jest.fn(() => Promise.resolve({ data: nftsData })) },
        }
    }

});

jest.mock('src/api/actions', () => {
    const nftsData = {
        uuid: "fsdffdsdsds",
        assetName: "dsfdsfds",
        nftType: "sdffsd",
        amount: "266",
        creditCount: "23",
        assetReferenceUrlRaw: "http://hujyhdsfdfbdks.com/iksdfkbnksdbkf",
        projectName: "ABC",
        projectVintage: "fgsddsdfs",
        nftClientName: "dsfsdf",
        status: "Owned",
        createdAt: new Date(),
        notes: "sdfsdfdsfs"
    };
    return {
        Api: {
            nft: { nftReviewUpdate: jest.fn(() => Promise.resolve({ data: nftsData })) },
        }
    }

});



describe('NFT Table renders', () => {
    test('renders', async () => {
        renderTest();
    });

    test('check elements', async () => {
        renderTest();
    });
});