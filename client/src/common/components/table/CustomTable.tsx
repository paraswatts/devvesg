import React from 'react';

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Checkbox } from 'src/common/forms/Checkbox';
import { QueryOrder, Table } from 'src/interfaces';

import styles from './table.module.scss'
import { TablePagination } from './TablePagination';
import 'antd/dist/antd.css';

export const CustomTable = ({ headers, rows, paging, onSizeChange, requestedPage, changeSorting }: Table) => {
    const { t } = useTranslation();
    const [checkBoxState, setCheckBoxState] = React.useState<boolean[]>(new Array(paging?.size || 0 + 1).fill(false));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let checkInfo: string[] = e.target.name.split('-');
        let position = Number(checkInfo[1]);

        if (position === 0)
            setCheckBoxState(checkBoxState.map((item, index) => !item));
        else
            setCheckBoxState(checkBoxState.map((item, index) => (index === position ? !item : item)));
    }

    return (
        <table >
            <thead>
                <tr>
                    {headers?.map((header, index) => (
                        header?.checkBox ?
                            <th key={`table-header-id-check`} className={styles.header_check}>
                                <Checkbox id={`id-0`} name={`name-0`} onChange={onChange} checked={checkBoxState[0]} value={checkBoxState[0] ? 'true' : 'false'} style={{ margin: '2px' }} />
                            </th>
                            :
                            <th className="w-1/6" key={`table-header-id-${header.key}`}>
                                <div className='flex justify-between items-center'>
                                    <span>{t(`table-headers.${header?.title}`)}</span>
                                    {
                                        header.hasSorting ?
                                            <div className='flex flex-col'>
                                                <button type="button" onClick={() => {
                                                    if (changeSorting) changeSorting({ [header.key]: QueryOrder.ASC })
                                                }}><FontAwesomeIcon icon={faAngleUp} color={paging?.orderBy[header.key] === QueryOrder.ASC ? '' : '#CCCCCC'} /></button>
                                                <button type="button" onClick={() => {
                                                    if (changeSorting) changeSorting({ [header.key]: QueryOrder.DESC })
                                                }}><FontAwesomeIcon icon={faAngleDown} color={paging?.orderBy[header.key] === QueryOrder.DESC ? '' : '#CCCCCC'} /></button>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            </th>))
                    }
                </tr>
            </thead>
            <tbody>
                {rows.map((rows, position) => {
                    return (
                        <tr key={`table-row-id-${rows.id}`}>
                            {rows?.cells.map((cell, index) => (

                                cell?.ischeckbox ?
                                    <td key={`table-cell-id-${index}`} className={styles.header_text}>
                                        <Checkbox id={`id-${position + 1}`} name={`name-${position + 1}`} onChange={onChange} checked={checkBoxState[position + 1]} value={checkBoxState[position + 1] ? 1 : 0} style={{ margin: '2px' }} />
                                    </td>
                                    :
                                    cell?.isLink && cell?.link ?
                                        <td key={`table-cell-id-${index}`}>
                                            <Link to={cell?.link} style={{ textDecoration: 'none' }}>{t(cell?.title)}</Link>
                                        </td>
                                        :
                                        <td key={`table-cell-id-${index}`}> {cell?.title} </td>)
                            )}
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <TablePagination
                            paging={paging}
                            onSizeChange={onSizeChange}
                            requestedPage={requestedPage}
                        />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};
