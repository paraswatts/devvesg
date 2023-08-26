import { render, screen } from '@testing-library/react';

import { Main } from 'src/common/skeleton/Main';

describe('Main', () => {
  test('it renders', () => {
    render(<Main>foobar</Main>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
