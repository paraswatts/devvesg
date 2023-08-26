import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';

import { Button, ExternalLinkButton, LinkButton } from 'src/common/interactions/Button';

describe('Button', () => {
  test('it renders a button', () => {
    const onClick = jest.fn();
    render(
      <Button.Primary type="button" onClick={onClick}>
        Foobar
      </Button.Primary>,
    );
    const button = screen.getByRole('button', { name: 'Foobar' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('it disables a button', () => {
    const onClick = jest.fn();
    render(
      <Button.Primary type="button" onClick={onClick} disabled>
        Foobar
      </Button.Primary>,
    );
    const button = screen.getByRole('button', { name: 'Foobar' });
    expect(button).toBeDisabled();
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});

describe('LinkButton', () => {
  test('it renders a link', () => {
    render(<LinkButton.Primary to="/foobar">Foobar</LinkButton.Primary>, { wrapper: MemoryRouter });
    const link = screen.getByRole('link', { name: 'Foobar' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/foobar');
  });
});

describe('ExternalLinkButton', () => {
  test('it renders a link', () => {
    render(<ExternalLinkButton.Primary href="https://www.devvesg.com">Foobar</ExternalLinkButton.Primary>);
    const link = screen.getByRole('link', { name: 'Foobar' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://www.devvesg.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
