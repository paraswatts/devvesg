import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Container } from 'src/common/layout/Container';

import devvEsgLogo from 'src/assets/images/devv-esg-logo.png';

const HEADER_PORTAL_ID = 'esg-header-portal';

interface UnauthenticatedHeaderProps {
  userArea?: ReactNode;
}
export const UnauthenticatedHeader = (props: UnauthenticatedHeaderProps) => {
  const { t } = useTranslation();
  const { userArea } = props;
  return (
    <header className="fixed z-10 w-full bg-white h-16">
      <Container>
        <nav className="relative flex justify-between px-4 py-5">
          <div>
            <Link to="/">
              <img className="h-6" src={devvEsgLogo} alt={t('global.devvesg')} />
            </Link>
          </div>

          <div id={HEADER_PORTAL_ID} className="flex-grow" />

          <div>{userArea}</div>
        </nav>
      </Container>
    </header>
  );
};

export const HeaderPortal = ({ children }: PropsWithChildren<any>) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }
  return createPortal(children, document.getElementById(HEADER_PORTAL_ID)!);
};
