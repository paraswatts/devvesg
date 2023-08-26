import { PropsWithChildren } from 'react';

import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router-dom';

import styles from 'src/common/layout/cards/CardTabBar.module.scss';

interface CardTabBarProps { }
export const CardTabBar = (props: PropsWithChildren<CardTabBarProps>) => (
  <ul className={styles.tabBar}>{props.children}</ul>
);

interface CardTabBarTabProps extends NavLinkProps { }
export const CardTabBarTab = (props: CardTabBarTabProps) => (
  <li className={styles.tabBarTab}>
    <NavLink {...props} className={({ isActive }) => clsx(isActive ? styles.active : styles.inactive)}>
      {props.children}
    </NavLink>
  </li>
);
