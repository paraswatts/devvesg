import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { Show } from 'src/common/layout';
import { Client, Partner } from 'src/interfaces';
import { ClientRoutes } from 'src/routes/clients';
import { PartnerRoutes } from 'src/routes/partners';

import tableStyles from 'src/common/styles/Table.module.scss';

export enum SelectionModalTypes {
  NONE = 'none',
  CLIENT = 'client',
  PARTNER = 'partner',
}

interface ClientPartnerSelectionModalProps {
  type: SelectionModalTypes;
  isOpen: boolean;
  onCloseModal: () => void;
}

export const ClientPartnerSelectionModal = React.memo((props: ClientPartnerSelectionModalProps) => {
  const { isOpen, onCloseModal, type } = props;
  const [items, setItems] = useState<Partner[] | Client[]>([]);
  const [clientsQuery, clientsResponse] = useLazyQuery<null, { data: Client[] }>(Api.client.list);
  const [partnersQuery, partnersResponse] = useLazyQuery<null, { data: Partner[] }>(Api.partner.list);

  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      if (type === SelectionModalTypes.CLIENT) {
        clientsQuery(null);
      } else {
        partnersQuery(null);
      }
    }
  }, [clientsQuery, partnersQuery, type, isOpen]);

  useEffect(() => {
    if (partnersResponse.status === 'resolved') {
      setItems(partnersResponse.response?.data || []);
    }
  }, [partnersResponse]);

  useEffect(() => {
    if (clientsResponse.status === 'resolved') {
      setItems(clientsResponse.response?.data || []);
    }
  }, [clientsResponse]);

  const isLoading = clientsResponse.status === 'loading' || partnersResponse.status === 'loading';

  return (
    <div>
      <Show show={isLoading}>{t('placeholder.loading')}</Show>
      <Show show={!isLoading}>
        <div className="max-h-96 overflow-y-auto">
          <table className={tableStyles.devvEsgTable}>
            <thead>
              <tr>
                <td className="w-full">{t('profile.name')}</td>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                return (
                  <tr key={`item-${i.uuid}`}>
                    <td className={tableStyles.small}>
                      <div className="align-middle">
                        {i.logo && <img className="w-10 inline-block mr-4" src={i.logo} alt={i.name} />}
                        {type === SelectionModalTypes.CLIENT ? (
                          <Link
                            to={generatePath(ClientRoutes.LAUNCHPAD, { clientUuid: i.uuid })}
                            onClick={onCloseModal}
                          >
                            {i.name}
                          </Link>
                        ) : (
                          <Link to={generatePath(PartnerRoutes.SHOW, { partnerUuid: i.uuid })} onClick={onCloseModal}>
                            {i.name}
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Show>
    </div>
  );
});
