import { PropsWithChildren, ReactNode } from 'react';

import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { t } from 'i18next';
import { NavLink, NavLinkProps } from 'react-router-dom';

import styles from 'src/common/layout/SideNav.module.scss';

export const SideNav = (props: PropsWithChildren<any>) => {
  return <div>{props.children}</div>;
};

interface SideNavGroupProps {
  label: ReactNode;
}
export const SideNavGroup = ({ label, children }: PropsWithChildren<SideNavGroupProps>) => {
  return (
    <div>
      <div className={clsx(styles.groupHeader, styles.groupActive)}>{label}</div>
      <ul>{children}</ul>
    </div>
  );
};

interface SideNavItemProps extends NavLinkProps {
  mock?: boolean;
}
export const SideNavItem = ({ mock, ...props }: SideNavItemProps) => {
  return (
    <li>
      {mock && (
        <div title={t('launchpad.coming-soon')} className={clsx(styles.link, styles.mock)}>
          {props.children}
        </div>
      )}
      {!mock && <NavLink className={({ isActive }) => clsx(styles.link, isActive && styles.linkActive)} {...props} />}
    </li>
  );
};

interface SideNavLaunchpadProps extends Omit<NavLinkProps, 'children'> {}
export const SideNavLaunchpad = (props: SideNavLaunchpadProps) => {
  return (
    <NavLink className={({ isActive }) => clsx(styles.link, isActive && styles.linkActive)} {...props}>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHome} />

        <span>{t('launchpad.launchpad')}</span>
      </div>
    </NavLink>
  );
};
