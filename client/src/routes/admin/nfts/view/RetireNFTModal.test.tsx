import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { I18nextProvider } from 'react-i18next';

import i18n from 'src/mocks/i18nForTests';
import { testRenderer } from 'src/mocks/renderer';

import { RetireNFTModal } from './RetireNFTModal';

describe('NFTRetire Modal renders', () => {
    const params = {
        nft: {
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
            creditType: "",
            projectVintage: "",
            projectVerifier: "",
            projectValidator: "",
            geography: "",
            locationCoordinates: "",
            publicRegistry: "",
            publicRegistryLink: "",
            mintId: "",
            notes: "",
            saleReceiptUri: "",
            nftClientName: ""
        }, showConfirmModal: jest.fn((val: boolean) => { }), submitRetireNFT: jest.fn(() => { })
    }
    const renderTest = testRenderer(
        <I18nextProvider i18n={i18n}>
            <RetireNFTModal {...params} />
        </I18nextProvider>,
    );


    test('It renders top title', async () => {
        renderTest();
        await act(async () => {
            const elementRef = await screen.findAllByText("Credits can only be retired once. This cannot be undone. Are you sure you want to continue?");
            expect(elementRef[0].innerHTML).toEqual("Credits can only be retired once. This cannot be undone. Are you sure you want to continue?");
        });
    });

    test('It renders bottom title', async () => {
        renderTest();
        const elementRef = await screen.findAllByText("Credits can only be retired once. This cannot be undone. Are you sure you want to continue?");
        expect(elementRef[0].innerHTML).toEqual("Credits can only be retired once. This cannot be undone. Are you sure you want to continue?");
    });

    test('Check buttons render and enabled', async () => {
        renderTest();
        const elementRef1 = await screen.findByRole("button", { name: "Nevermind" });
        const elementRef2 = await screen.findByRole("button", { name: "Yes" });
        expect(elementRef1).toBeInTheDocument();
        expect(elementRef2).toBeInTheDocument();
    });

    test('Check Nevermind button click', async () => {
        renderTest();
        const elementRef = await screen.findByRole("button", { name: "Nevermind" });
        userEvent.click(elementRef);
        expect(params.showConfirmModal).toHaveBeenCalledTimes(1);
    });

    test('Check submit click', async () => {
        renderTest();
        const retireDate = await screen.findByPlaceholderText("MM-DD-YYYY");
        const carbonCredits = await screen.findByPlaceholderText("1,200");

        expect(retireDate).toBeInTheDocument();
        expect(carbonCredits).toBeInTheDocument();

    });
})
