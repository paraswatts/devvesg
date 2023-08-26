import { render, screen } from '@testing-library/react';

import { SectionLabel } from 'src/common/typography/SectionLabel';

describe('SectionLabel', () => {
  test('it renders', () => {
    render(<SectionLabel>foobar</SectionLabel>);
    expect(screen.getByText('foobar')).toBeInTheDocument();
  });
});
