import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { RequirementNavigation } from 'src/routes/partners/requirements/RequirementNavigation';

jest.mock('src/common/hooks/useParams', () => ({
  useParams: () => ({ requirementUuid: 'requirement-uuid' }),
}));

describe('RequirementNavigation', () => {
  test('it renders', () => {
    render(<RequirementNavigation />, { wrapper: MemoryRouter });
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Documents' })).toBeInTheDocument();
  });
});
