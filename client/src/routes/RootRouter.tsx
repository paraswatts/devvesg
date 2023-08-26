import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, Navigate, Route, Routes, generatePath } from 'react-router-dom';

import { Modal } from 'src/common/components';
import {
  ClientPartnerSelectionModal,
  SelectionModalTypes,
} from 'src/common/components/modals/ClientPartnerSelectionModal';
import { Button } from 'src/common/interactions/Button';
import { PrivateRoute } from 'src/common/PrivateRoute';
import { useUser } from 'src/common/providers/UserProvider';
import { HeaderPortal } from 'src/common/skeleton/UnauthenticatedHeader';
import { UserTypes } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin';
import { AdminRouter } from 'src/routes/admin/AdminRouter';
import { ClientRoutes } from 'src/routes/clients';
import { ClientRouter } from 'src/routes/clients/ClientRouter';
import { PartnerRoutes } from 'src/routes/partners';
import { PartnerRouter } from 'src/routes/partners/PartnerRouter';

export const RootRouter = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<RootRedirection />} />

        <Route element={<PrivateRoute allowedTypes={[UserTypes.ADMIN]} />}>
          <Route path={`${AdminRoutes.HOME}/*`} element={<AdminRouter />} />
        </Route>

        <Route element={<PrivateRoute allowedTypes={[UserTypes.CLIENT, UserTypes.ADMIN]} />}>
          <Route path={`${ClientRoutes.LAUNCHPAD}/*`} element={<ClientRouter />} />
        </Route>

        <Route element={<PrivateRoute allowedTypes={[UserTypes.PARTNER, UserTypes.ADMIN]} />}>
          <Route path={`${PartnerRoutes.SHOW}/*`} element={<PartnerRouter />} />
        </Route>
      </Routes>

      <AdminNavbar />
    </>
  );
};

const RootRedirection = () => {
  const { user } = useUser();
  if (user.type === UserTypes.ADMIN) {
    return <Navigate to="admin" replace />;
  } else if (user.type === UserTypes.CLIENT) {
    if (!user.onboardingComplete) {
      return <Navigate to={generatePath(ClientRoutes.PROFILE_COMPANY_EDIT, { clientUuid: user.clientUuid })} replace />;
    } else {
      return <Navigate to={generatePath(ClientRoutes.LAUNCHPAD, { clientUuid: user.clientUuid })} replace />;
    }
  } else if (user.type === UserTypes.PARTNER) {
    return <Navigate to={generatePath(PartnerRoutes.SHOW, { partnerUuid: user.partnerUuid })} replace />;
  } else {
    return null;
  }
};

const AdminNavbar = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  const [selectionModalType, setSelectionModalType] = useState<SelectionModalTypes>(SelectionModalTypes.NONE);
  const handleSelectionModalToggle = (type: SelectionModalTypes) => setSelectionModalType(type);

  if (user.type !== UserTypes.ADMIN) {
    return null;
  }

  return (
    <>
      <HeaderPortal>
        <div className="flex items-center gap-4 px-4">
          <Link to={AdminRoutes.HOME}>{t('home')}</Link>
          <Button.Link type="button" onClick={() => handleSelectionModalToggle(SelectionModalTypes.CLIENT)}>
            {t('buttons.select-client')}
          </Button.Link>
          <Button.Link type="button" onClick={() => handleSelectionModalToggle(SelectionModalTypes.PARTNER)}>
            {t('buttons.select-partner')}
          </Button.Link>
        </div>
      </HeaderPortal>

      <Modal
        title={selectionModalType === SelectionModalTypes.CLIENT ? 'Clients' : 'Partners'}
        isOpen={selectionModalType !== SelectionModalTypes.NONE}
        onCancelModal={() => handleSelectionModalToggle(SelectionModalTypes.NONE)}
      >
        <ClientPartnerSelectionModal
          type={selectionModalType}
          isOpen={selectionModalType !== SelectionModalTypes.NONE}
          onCloseModal={() => handleSelectionModalToggle(SelectionModalTypes.NONE)}
        />
      </Modal>
    </>
  );
};
