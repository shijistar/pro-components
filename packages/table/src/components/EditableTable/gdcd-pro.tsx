import { useContext } from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import { TablePaginationConfig } from 'antd/es/table/interface';
import classNames from 'classnames';
import { EditableProTableProps } from '.';
import { ProTableProps } from '../../typing';
import { ConfigProvider } from 'antd';

export type GDCDEditableProTableProps<T, U extends ParamsType, ValueType = 'text'> = {
  pagination?: TablePaginationConfig | boolean;
};

export function useCustomizedProTableProps<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: EditableProTableProps<DataType, Params, ValueType>,
): ProTableProps<DataType, Params, ValueType> {
  const { className, fullHeight, recordCreatorProps } = props;

  const pagination = props.pagination === true ? {} : props.pagination || false;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  return {
    className: classNames(
      className,
      fullHeight && `${getPrefixCls('pro-table')}-full-height`,
      pagination !== false && `${getPrefixCls('pro-table')}-has-pagination`,
      recordCreatorProps && `${getPrefixCls('pro-table')}-has-creator`,
    ),
    tableClassName: classNames(props.tableClassName),
    pagination,
  };
}
