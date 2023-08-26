import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useTranslation } from 'react-i18next';

import { CtaCardCarbonFootprint } from 'src/common/components/call-to-action';
import { useDateFmt, useNumberFmt } from 'src/common/formatters';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody, CardTitle, CardTitles } from 'src/common/layout/cards';
import { CarbonTabBar } from 'src/routes/clients/analyze/carbon/common';
import {
  CarbonFootprintDelete,
  CarbonFootprintDeleteVariables,
} from 'src/routes/clients/analyze/carbon/impact-history/__gql__/CarbonFootprintDelete';
import {
  GetCarbonImpactHistory_client_footprints_items as CarbonFootprint,
  GetCarbonImpactHistory,
  GetCarbonImpactHistoryVariables,
} from 'src/routes/clients/analyze/carbon/impact-history/__gql__/GetCarbonImpactHistory';
import {
  CARBON_FOOTPRINT_DELETE,
  GET_CARBON_IMPACT_HISTORY,
} from 'src/routes/clients/analyze/carbon/impact-history/CarbonImpactHistoryContainer.query';

export const CarbonImpactHistoryContainer = () => {
  const { t } = useTranslation();
  const { clientUuid } = useParams<{ clientUuid: string }>();
  const numberFmt = useNumberFmt({ maximumFractionDigits: 1 });
  const dateFmt = useDateFmt({ day: '2-digit', month: '2-digit', year: 'numeric' });

  const { refetch } = useQuery<GetCarbonImpactHistory, GetCarbonImpactHistoryVariables>(GET_CARBON_IMPACT_HISTORY, {
    variables: { clientId: clientUuid },
    onCompleted: (response) => {
      setCarbonFootprints(response.client.footprints.items);
    },
  });

  const [deleteFootprint, { loading: deleteFootprintLoading }] = useMutation<
    CarbonFootprintDelete,
    CarbonFootprintDeleteVariables
  >(CARBON_FOOTPRINT_DELETE, {
    onCompleted: (response) => {
      refetch();
    },
  });

  const handleDeleteFootprint = useCallback(
    (uuid: string) => {
      if (deleteFootprintLoading) {
        return;
      }
      if (!window.confirm(t('analyse.remove-footprint'))) {
        return;
      }
      deleteFootprint({ variables: { carbonFootprintId: uuid, clientId: clientUuid } });
    },
    [clientUuid, deleteFootprint, deleteFootprintLoading, t],
  );

  const [carbonFootprints, setCarbonFootprints] = useState<CarbonFootprint[]>([]);
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: 'total',
        headerName: `${t('analyse.impact')} (TCO2)`,
        valueFormatter: (params: any) => {
          return numberFmt(params.data.total);
        },
      },
      {
        field: 'createdAt',
        headerName: t('analyse.date-added'),
        valueFormatter: (params: any) => {
          return dateFmt(params.data.createdAt);
        },
      },
      {
        field: 'uuid',
        headerName: t('analyse.actions'),
        cellRenderer: FootprintDeleteButton,
        cellRendererParams: {
          handleDeleteFootprint,
          t,
        },
      },
    ],
    [t, dateFmt, numberFmt, handleDeleteFootprint],
  );

  const [destroyed, setDestroyed] = useState(false);

  useEffect(() => {
    //removing the grid for rendering translated text
    setDestroyed(true);
    setTimeout(() => setDestroyed(false));
  }, [t]);

  return (
    <CallToActionLayout ctas={[<CtaCardCarbonFootprint />]}>
      <Card>
        <CarbonTabBar />

        <CardBody>
          <CardTitles>
            <CardTitle>{t('analyse.carbon-impact-history')}</CardTitle>
          </CardTitles>
          <div className="mt-6">
            <div className="h-96 ag-theme-alpine">
              {!destroyed && (
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={carbonFootprints}
                  suppressCellFocus
                  suppressHorizontalScroll
                  suppressMovableColumns
                  onGridReady={({ api, columnApi }) => {
                    api.sizeColumnsToFit();
                    columnApi.resetColumnState();
                  }}
                  localeTextFunc={() => t('analyse.no-rows-to-show')}
                />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </CallToActionLayout>
  );
};

const FootprintDeleteButton = (
  props: ICellRendererParams & { handleDeleteFootprint: (uuid: string) => void; t: (key: string) => string },
) => {
  return (
    <div>
      <Button.Primary small className="leading-6" onClick={() => props.handleDeleteFootprint(props.value)}>
        {props.t('global.delete')}
      </Button.Primary>
    </div>
  );
};
