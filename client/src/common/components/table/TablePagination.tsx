import { ConfigProvider, Pagination } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import es_ES from 'antd/lib/locale-provider/es_ES';
import ja_JP from 'antd/lib/locale-provider/ja_JP';
import { useTranslation } from 'react-i18next';

import { PaginationParams } from 'src/interfaces';

import 'antd/dist/antd.css';
interface TablePaginationProps {
  paging: PaginationParams;
  onSizeChange?: (current: number, size: number) => void;
  requestedPage?: (page: number, pageSize: number) => void;
}

export const TablePagination = ({ paging, onSizeChange, requestedPage }: TablePaginationProps) => {
  const { i18n, t } = useTranslation();
  const switchLanguage = () => {
    switch (i18n.language) {
      case 'en':
        return en_US;
      case 'es':
        return es_ES;
      case 'ja':
        return ja_JP;
      default:
        return en_US;
    }
  };
  return (
    <ConfigProvider locale={switchLanguage()}>
      <Pagination
        current={paging.page}
        defaultCurrent={paging.page}
        total={paging.total}
        showQuickJumper
        onShowSizeChange={onSizeChange}
        showSizeChanger
        showTotal={() => `${t('buttons.total')} : ${paging.total} ${t('improve.items')}`}
        onChange={requestedPage}
      />
    </ConfigProvider>
  );
};
