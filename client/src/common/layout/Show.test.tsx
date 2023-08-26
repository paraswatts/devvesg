import { render, screen } from '@testing-library/react';

import { Show } from 'src/common/layout/Show';

describe('Show', () => {
  test('it shows', () => {
    render(<Show show>foobar</Show>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });

  test('it hides', () => {
    render(<Show>foobar</Show>);
    expect(screen.queryByText('foobar')).not.toBeInTheDocument();
  });
});
