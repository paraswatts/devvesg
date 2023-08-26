import React from 'react';


import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps, generatePath, useMatch } from 'react-router-dom';

import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';

interface NavMenuProps {
  name: string | null;
  onOpenProfileModal: () => void;
  onSignOut: () => void;
}

export const NavMenu = React.memo((props: NavMenuProps) => {
  const { t } = useTranslation();
  const { name, onOpenProfileModal, onSignOut } = props;

  const clientPathMatch = useMatch('/clients/:clientUuid/*');

  return (
    <Menu>
      {({ open }) => (
        <div className={clsx('absolute top-0 right-4 sm:w-56', open && 'w-56 shadow-lg bg-white')}>
          <Menu.Button className="flex items-center justify-end gap-4 w-full p-4 text-right">
            <div className={clsx('flex-grow sm:block truncate', !open && 'hidden')}>{name}</div>
            <div>
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </div>
          </Menu.Button>
          {open && (
            <Menu.Items static className="w-56 pt-2 shadow-lg outline-none">
              <Menu.Item>
                <NavMenuButton onClick={onOpenProfileModal}>{t('global.header.settings')}</NavMenuButton>
              </Menu.Item>
              {clientPathMatch && clientPathMatch.params.clientUuid && (
                <Menu.Item>
                  <NavMenuLink
                    to={generatePath(ClientAbsoluteRoutes.PROFILE_COMPANY_EDIT, {
                      clientUuid: clientPathMatch.params.clientUuid,
                    })}
                  >
                    {t('global.header.my-profile')}
                  </NavMenuLink>
                </Menu.Item>
              )}
              <Menu.Item>
                <NavMenuButton onClick={onSignOut}>{t('global.header.logout')}</NavMenuButton>
              </Menu.Item>
            </Menu.Items>
          )}
        </div>
      )}
    </Menu>
  );
});

const BUTTON_CLASSES = 'block w-full p-4 border-t bg-transparent text-center';

const NavMenuButton = (props: React.ComponentPropsWithoutRef<'button'>) => (
  <button type="button" className={BUTTON_CLASSES} {...props} />
);

const NavMenuLink = (props: LinkProps) => (
  <Link className={clsx(BUTTON_CLASSES, 'text-neutral-900 hover:text-neutral-900 no-underline')} {...props} />
);
