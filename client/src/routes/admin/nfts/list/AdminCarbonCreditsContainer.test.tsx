
import { screen, waitFor } from '@testing-library/react';

import { testRenderer } from 'src/mocks/renderer';

import { AdminCarbonCreditsContainer } from './AdminCarbonCreditsContainer';

const renderTest = testRenderer(<AdminCarbonCreditsContainer />);
describe('check loading  heading', () => {
    test('renders', async () => {
        renderTest();
        expect(screen.getByTestId('h1')).toBeInTheDocument();
    });
});