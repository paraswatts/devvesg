import { render, screen } from '@testing-library/react';

import { Container } from 'src/common/layout/Container';

describe('Container', () => {
  test('it renders', () => {
    render(<Container>foobar</Container>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
