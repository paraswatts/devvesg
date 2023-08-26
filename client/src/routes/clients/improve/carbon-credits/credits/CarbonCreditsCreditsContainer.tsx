import React, { useEffect, useState } from 'react';

import dayjs from "dayjs";
import { generatePath } from 'react-router';

import { Api, useLazyQuery } from 'src/api';
import { CustomTable, NftStatus } from 'src/common/components';
import { CallToActionLayout } from 'src/common/layout';
import { Card, CardBody } from 'src/common/layout/cards';
import { PaginationParams, QueryOrder, QueryOrderMap, Table, TableCell, TableHeader, TablePagination, TableRow } from 'src/interfaces';
import { CarbonCreditsTabBar } from 'src/routes/clients/improve/carbon-credits/common';
import { useClient } from 'src/routes/clients/providers/ClientProvider';
import { ClientRoutes } from 'src/routes/clients/routes';

import './credits.module.scss'

export const CarbonCreditsCreditsContainer = React.memo(({ type }: { type: string }) => {
  const [paging, setPaging] = useState<PaginationParams>({ total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC }, type: type });
  const [tablePagination, setTablePagination] = useState<PaginationParams>({ total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC }, type: type });
  const [tableData, setTableData] = useState<Table>({
    headers: [],
    rows: [],
    paging: { total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC }, type: type },
  });

  const { client } = useClient();

  const [nftsQuery, nftsResponse] = useLazyQuery<PaginationParams, { data: TablePagination }>(Api.nft.list, {
    onSuccess: (res) => {
      const pagination: PaginationParams = res.data.pagination;
      const tableRows: TableRow[] = res.data.nfts.map((nft, index) => {
        const tableCells: TableCell[] = []

        tableCells.push({ title: 'checkbox', ischeckbox: true })
        tableCells.push({ title: <NftStatus status={nft.status} /> })
        tableCells.push({ title: dayjs(nft.createdAt).format('MMM DD,YYYY') })
        tableCells.push({
          title: 'buttons.view', isLink: true, link: generatePath(ClientRoutes.CARBON_CREDITS_VIEW, {
            nftUuid: nft.uuid,
            clientUuid: client.uuid,
            type: type
          })
        })
        const tableRow = {
          id: nft.uuid,
          cells: tableCells
        }
        return tableRow
      });
      const tableHeaders: TableHeader[] = [
        {
          title: 'header-checkbox',
          key: 'checkAll',
          checkBox: true
        },
        {
          title: 'status',
          hasSorting: true,
          key: 'status',
        },
        {
          title: 'date-submitted',
          hasSorting: true,
          key: 'createdAt',
        },
        {
          title: 'action',
          key: 'action',
        },
      ];
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
    nftsQuery({ ...tablePagination, type: type });
  }, [tablePagination, type, nftsQuery]);

  if (!nftsResponse.response?.data) {
    return null;
  }

  const onSizeChange = () => {
    nftsQuery(tablePagination);
  }

  const requestedPage = (page: number, pageSize: number) => {
    paging.page = page;
    paging.size = pageSize;
    setTablePagination(JSON.parse(JSON.stringify(paging)));
  }

  const changeSorting = (orderBy: QueryOrderMap) => {
    setTablePagination({ ...paging, orderBy: orderBy });
  }

  return (
    <CallToActionLayout>
      <Card>
        <CarbonCreditsTabBar />
        <CardBody>
          <CustomTable {...tableData} onSizeChange={onSizeChange} requestedPage={requestedPage} changeSorting={changeSorting} />
        </CardBody>
      </Card>
    </CallToActionLayout>
  );
});
