import { render, screen } from '@testing-library/react';

import { ExternalLinkDisplay } from 'src/common/components/external-link-display/ExternalLinkDisplay';

describe('ExternalLinkDisplay', () => {
  test('It renders an external link', () => {
    render(<ExternalLinkDisplay href="http://google.com">test-link</ExternalLinkDisplay>);
    expect(screen.getByText('test-link')).toHaveAttribute('href', 'http://google.com');
    expect(screen.getByText('test-link')).toHaveAttribute('target', '_blank');
    expect(screen.getByText('test-link')).toHaveAttribute('rel', 'noreferrer');
  });
  test('It renders a link without a protocol', () => {
    render(<ExternalLinkDisplay href="google.com">test-link</ExternalLinkDisplay>);
    expect(screen.getByText('test-link')).toHaveAttribute('href', 'https://google.com');
    expect(screen.getByText('test-link')).toHaveAttribute('target', '_blank');
    expect(screen.getByText('test-link')).toHaveAttribute('rel', 'noreferrer');
  });
  test('It renders nothing without an href', () => {
    render(<ExternalLinkDisplay>test-link</ExternalLinkDisplay>);
    expect(screen.queryByText('test-link')).not.toBeInTheDocument();
  });
});
