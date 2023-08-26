
import { screen } from '@testing-library/react';

import { testRenderer } from 'src/mocks/renderer';

import { AdminCarbonCredits } from './AdminCarbonCredits';

const renderTest = testRenderer(<AdminCarbonCredits />);


jest.mock('src/api/actions', () => {
    const nftsData = {
        nfts: [
            {
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
            },
            {
                uuid: "asdfdffsdf",
                assetName: "sffdvxvv",
                nftType: "gjhnffhfg",
                amount: "345",
                creditCount: "12",
                assetReferenceUrlRaw: "http://hujyhdsfdfbdks.com/hfhffvbnvb",
                projectName: "WER",
                projectVintage: "xvxccvxc",
                nftClientName: "vxcvxx",
                status: "Owned",
                createdAt: new Date(),
                notes: "fdgdg"
            }
        ],
        pagination: {
            total: 15,
            page: 1,
            size: 10,
            orderBy: { createdAt: 'DESC' }
        },
        sort: [
            {
                name: "companyName",
                order: "desc"
            }
        ]
    };
    return {
        Api: {
            nft: { list: jest.fn(() => Promise.resolve({ data: nftsData })) },
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

