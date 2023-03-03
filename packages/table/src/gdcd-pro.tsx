import { ProTableProps } from './typing';
import { TablePaginationConfig, TableProps } from 'antd';

export type GDCDProTableProps<T, U, ValueType = 'text'> = {
  /** 表格撑满容器，高度100% */
  fullHeight?: boolean;
};

export function useCustomizedTableProps<T, U, ValueType = 'text'>(
  props: ProTableProps<T, U, ValueType> & {
    defaultClassName: string;
  },
): TableProps<T> {
  return {};
}

export function useDefaultPagination<T, U, ValueType = 'text'>(
  props: ProTableProps<T, U, ValueType>,
): TablePaginationConfig {
  return {
    defaultPageSize: 20,
    size: 'default',
    simple: false,
    showSizeChanger: props.size !== 'small',
    showQuickJumper: props.size !== 'small',
    showTotal: props.size === 'small' ? undefined : (total: number) => `共 ${total} 条`,
  };
}
