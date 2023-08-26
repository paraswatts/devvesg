import React, { useEffect, useState } from 'react';

import dayjs from "dayjs";
import { generatePath } from 'react-router';

import { Api, useLazyQuery } from 'src/api';
import { CustomTable, NftStatus } from 'src/common/components';
import { Card, CardBody } from 'src/common/layout/cards';
import { PaginationParams, QueryOrder, QueryOrderMap, Table, TableCell, TableHeader, TablePagination, TableRow } from 'src/interfaces';
import { AdminRoutes } from 'src/routes/admin/index';

import './credits.module.scss'

export const AdminCarbonCredits = React.memo(() => {
  const [paging, setPaging] = useState<PaginationParams>({ total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC }, });
  const [tablePagination, setTablePagination] = useState<PaginationParams>({ total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC } });
  const [tableData, setTableData] = useState<Table>({
    headers: [],
    rows: [],
    paging: { total: 0, page: 1, size: 10, orderBy: { createdAt: QueryOrder.DESC } },
  });

  const [nftsQuery, nftsResponse] = useLazyQuery<PaginationParams, { data: TablePagination }>(Api.nft.list, {
    onSuccess: (res) => {
      const pagination: PaginationParams = res.data.pagination
      const tableRows: TableRow[] = res.data.nfts.map((nft) => {
        const tableCells: TableCell[] = []
        tableCells.push({ title: nft.nftClientName });
        tableCells.push({ title: <NftStatus status={nft.status} /> });
        tableCells.push({ title: dayjs(nft.createdAt).format('MMM DD,YYYY') });
        tableCells.push({ title: nft.creditType });
        tableCells.push({
          title: "admin.review", isLink: true, link: generatePath(AdminRoutes.NFTS_VIEW, { nftUuid: nft.uuid })
        })
        const tableRow = {
          id: nft.uuid,
          cells: tableCells
        }
        return tableRow
      })

      const tableHeaders: TableHeader[] = [
        {
          title: 'company', //localized string from tableHeaders
          hasSorting: false,
          key: 'nftClientName'
        },
        {
          title: 'status',
          hasSorting: true,
          key: 'status'
        },
        {
          title: 'date-submitted',
          hasSorting: true,
          key: 'createdAt'
        },
        {
          title: 'credits-type',
          key: 'creditType'
        },
        {
          title: 'action',
          key: 'action'
        }
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
    nftsQuery({ ...tablePagination });
  }, [tablePagination, nftsQuery]);

  if (!nftsResponse.response?.data) {
    return null;
  }

  const onSizeChange = () => {
    nftsQuery(tablePagination);
  }

  const requestedPage = (page: number, pageSize: number) => {
    paging.page = page;
    paging.size = pageSize
    setTablePagination(JSON.parse(JSON.stringify(paging)));
  }

  const changeSorting = (orderBy: QueryOrderMap) => {
    setTablePagination({ ...paging, orderBy: orderBy });
  }

  return (
    <Card>
      <CardBody>
        <CustomTable {...tableData} onSizeChange={onSizeChange} requestedPage={requestedPage} changeSorting={changeSorting} />
      </CardBody>
    </Card>
  );
});
