import React, { ComponentPropsWithoutRef } from 'react';

import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

interface CustomButtonProps {
  small?: boolean;
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & CustomButtonProps;

type LinkButtonProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> &
  Pick<ComponentPropsWithoutRef<'button'>, 'disabled'> &
  Pick<LinkProps, 'to' | 'replace'> &
  CustomButtonProps;

type ExternalLinkButtonProps = ComponentPropsWithoutRef<'a'> &
  Pick<ComponentPropsWithoutRef<'button'>, 'disabled'> &
  CustomButtonProps;

const PRIMARY_STYLES: ButtonStyleOptions = {
  base: 'bg-blue-500 text-white',
  enabled: 'hover:bg-blue-300 hover:text-white',
  disabled: 'bg-neutral-500',
};

const SECONDARY_STYLES: ButtonStyleOptions = {
  base: 'bg-orange-500 text-white',
  enabled: 'hover:bg-orange-300 hover:text-white',
  disabled: 'bg-neutral-500',
};

const ACCENT_STYLES: ButtonStyleOptions = {
  base: 'bg-green-500 text-white',
  enabled: 'hover:bg-green-300 hover:text-white',
  disabled: 'bg-neutral-500',
};

const WARNING_STYLES: ButtonStyleOptions = {
  base: 'bg-orange-500 text-white',
  enabled: 'hover:bg-orange-300 hover:text-white',
  disabled: 'bg-neutral-500',
};

const OUTLINE_STYLES: ButtonStyleOptions = {
  base: 'bg-white text-neutral-900 border border-neutral-700',
  enabled: 'hover:bg-white hover:text-blue-700 hover:border-blue-700',
  disabled: 'bg-neutral-500',
};

export const Button = {
  Primary: createButton(PRIMARY_STYLES),
  Secondary: createButton(SECONDARY_STYLES),
  Accent: createButton(ACCENT_STYLES),
  Warning: createButton(WARNING_STYLES),
  Outline: createButton(OUTLINE_STYLES),
  Link: createRawButton({
    base: 'bg-transparent text-blue-500 underline transition-colors',
    enabled: 'hover:bg-transparent hover:text-blue-100',
  }),
  NavLink: createRawButton({ base: 'w-full text-left bg-transparent font-bold text-white' }),
};

export const LinkButton = {
  Primary: createLinkButton(PRIMARY_STYLES),
  Secondary: createLinkButton(SECONDARY_STYLES),
  Accent: createLinkButton(ACCENT_STYLES),
  Warning: createLinkButton(WARNING_STYLES),
  Outline: createLinkButton(OUTLINE_STYLES),
};

export const ExternalLinkButton = {
  Primary: createExternalLinkButton(PRIMARY_STYLES),
};

interface ButtonStyleOptions {
  base: string;
  enabled?: string;
  disabled?: string;
}

// Creates a standard button with basic assumptions about standard button styles and sizing
function createButton(options: ButtonStyleOptions) {
  return React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, small, ...rest } = props;
    return (
      <button
        ref={ref}
        className={clsx(
          'rounded text-center transition-colors',
          small ? 'p-1 font-normal' : 'p-3 font-bold',
          options.base,
          rest.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          rest.disabled ? options.disabled : options.enabled,
          className,
        )}
        {...rest}
      />
    );
  });
}

// Creates buttons without any assumptions about sizing or base styling
function createRawButton(options: ButtonStyleOptions) {
  return React.forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>((props, ref) => {
    const { className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={clsx(
          options.base,
          rest.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          rest.disabled ? options.disabled : options.enabled,
          className,
        )}
        {...rest}
      />
    );
  });
}

// Same as createButton, but for internal site links that look like buttons
function createLinkButton(options: ButtonStyleOptions) {
  return React.forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
    const { className, small, ...rest } = props;
    return (
      <Link
        ref={ref}
        className={clsx(
          'inline-block rounded no-underline text-center transition-colors',
          small ? 'p-1 font-normal' : 'p-3 font-bold',
          options.base,
          rest.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          rest.disabled ? options.disabled : options.enabled,
          className,
        )}
        {...rest}
      />
    );
  });
}

// Same as createLinkButton, but for external site links that look like buttons
function createExternalLinkButton(options: ButtonStyleOptions) {
  return React.forwardRef<HTMLAnchorElement, ExternalLinkButtonProps>((props, ref) => {
    const { className, small, target = '_blank', ...rest } = props;
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        ref={ref}
        className={clsx(
          'inline-block rounded no-underline text-center',
          small ? 'p-1 font-normal' : 'p-3 font-bold',
          options.base,
          rest.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          rest.disabled ? options.disabled : options.enabled,
          className,
        )}
        target={target}
        {...rest}
      />
    );
  });
}
