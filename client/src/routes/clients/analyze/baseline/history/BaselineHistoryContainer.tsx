import { useCallback, useEffect, useState } from 'react';

import { Skeleton } from 'antd';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';

import { Api, useLazyQuery } from 'src/api';
import { CustomTable } from 'src/common/components';
import { Card, CardBody, CardSubtitle, CardTitles } from 'src/common/layout/cards';
import { PaginationParams, QueryOrder, QuizHistory, Table, TableCell, TableHeader, TableRow } from 'src/interfaces';
import { BaselineTabBar } from 'src/routes/clients/analyze/baseline/common';
import { QuizInstance } from 'src/routes/clients/analyze/baseline/common/__gql__/GetQuiz';
import { ClientAbsoluteRoutes } from 'src/routes/clients/ClientRouter';
import { useClient } from 'src/routes/clients/providers/ClientProvider';

import styles from './BaselineHistoryContainer.module.scss';

export const BaselineHistoryContainer = () => {
  const { t } = useTranslation();
  const { client } = useClient();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [tablePagination, setTablePagination] = useState<PaginationParams>({ total: 0, page: 1, size: 10, orderBy: { updatedAt: QueryOrder.DESC } });
  const [paging, setPaging] = useState<PaginationParams>({ total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC }, });
  const [tableData, setTableData] = useState<Table>({
    headers: [],
    rows: [],
    paging: { total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC } },
  });
  const [getInstancesRequest] = useLazyQuery<PaginationParams, { data: QuizHistory }>(Api.quiz.getHistory, {
    onSuccess: (response: any) => {
      setTimeout(() => {
        setLoaded(true)
      }, 500)
      const pagination: PaginationParams = response.data.pagination
      const tableRows: TableRow[] = response?.data?.instances?.map((instance: QuizInstance) => {
        const tableCells: TableCell[] = []
        tableCells.push({ title: instance.quiz?.name });
        tableCells.push({ title: dayjs(instance.updatedAt).format('MMMM DD,YYYY') });
        tableCells.push({
          title: "buttons.view", isLink: true, link: generatePath(ClientAbsoluteRoutes.BASELINE_HISTORY_INSTANCE, { clientUuid: client.uuid, quizInstanceUuid: instance.uuid })
        })
        const tableRow = {
          id: instance.uuid,
          cells: tableCells
        }
        return tableRow
      })
      const tableHeaders: TableHeader[] = [
        {
          title: "esg-questionnaire", //localized string from tableHeaders
          key: 'esg-questionnaire'
        },
        {
          title: "date-completed",
          key: 'date-completed'
        },
        {
          title: "action",
          key: 'action'
        },
      ]
      const tableData: Table = {
        headers: tableHeaders,
        rows: tableRows,
        paging: pagination,
      }
      setTableData(tableData)
      setPaging(pagination);
    }
  });

  useEffect(() => {
    getInstancesRequest({ ...tablePagination })
  }, [getInstancesRequest, tablePagination])

  const onSizeChange = useCallback((current: number, size: number) => {
    setTablePagination({ ...tablePagination, size })
  }, [tablePagination]);

  const requestedPage = useCallback((page: number, pageSize: number) => {
    setTablePagination(({ ...paging, page, size: pageSize }));
  }, [paging]);

  return (
    <>
      <Card>
        <BaselineTabBar />
        <CardBody>
          {loaded ?
            <>
              <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col">
                  <CardTitles>
                    <CardSubtitle className={styles.quiz_history_subtitle}>{t("questionnaire.view-previous-responses")}</CardSubtitle>
                  </CardTitles>
                </div>
              </div>

              <div className="mt-8">
                <CustomTable {...tableData} onSizeChange={onSizeChange} requestedPage={requestedPage} />
              </div>
            </> : <Skeleton />}
        </CardBody>
      </Card>
    </>
  );
};