import { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Modal, NavMenu, UserProfileModal } from 'src/common/components';
import { useAuthentication } from 'src/common/providers/AuthenticationProvider';
import { UserContext } from 'src/common/providers/UserProvider';
import { UnauthenticatedHeader } from 'src/common/skeleton/UnauthenticatedHeader';

export const Header = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const { signOut } = useAuthentication();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <>
      <UnauthenticatedHeader
        userArea={
          <NavMenu
            name={`${user.firstName} ${user.lastName}`}
            onOpenProfileModal={() => setProfileModalOpen(true)}
            onSignOut={signOut}
          />
        }
      />

      <Modal isOpen={profileModalOpen} onCancelModal={() => setProfileModalOpen(false)} title={t('global.header.settings')}>
        <UserProfileModal isOpen={profileModalOpen} onCloseModal={() => setProfileModalOpen(false)} />
      </Modal>
    </>
  );
};
