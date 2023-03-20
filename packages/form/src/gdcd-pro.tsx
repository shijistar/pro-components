import { useContext } from 'react';
import classNames from 'classnames';
import { ConfigProvider, FormItemProps } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import type { ProAliasToken } from '@ant-design/pro-provider';
import { CSSInterpolation } from '@ant-design/cssinjs';
import { ExtendsProps, ProFormFieldItemProps, ProFormItemCreateConfig } from './typing';
import { EditOrReadOnlyContext } from './BaseForm/EditOrReadOnlyContext';

export type CustomizedProFormItemProps = {
  /**
   * 只读模式下，是否为控件值添加边框。
   *
   * 对于单列的表单，如果没有边框，内容主要都集中在左侧，右侧比较空，页面比例不太协调。
   *
   * 如果表单是纵向排列的，建议设置为 `true`。
   *
   * @default `false`
   *
   * @type {boolean}
   */
  readModeBorder?: boolean;
};
export const useFormItemPropsForCreateField = (
  props: ProFormFieldItemProps & ExtendsProps,
  config?: ProFormItemCreateConfig,
) => {
  const { readModeBorder = false } = props;
  const { getPrefixCls } = useContext(ConfigContext || ConfigProvider.ConfigContext);
  const modeContext = useContext(EditOrReadOnlyContext);
  const mode = props.proFieldProps?.mode || modeContext?.mode || 'edit';
  const label = props.formItemProps?.label || props.label;
  return {
    customizedFormItemProps: {
      className: classNames(
        props.className,
        readModeBorder && mode === 'read' && getPrefixCls('pro-form-item-read-mode'),
        !label && getPrefixCls('pro-form-item-no-label'),
      ),
    } as FormItemProps,
  };
};

export interface ProFormToken extends ProAliasToken {
  componentCls: string;
}

export const useCustomizedProFormStyle = (
  token: ProFormToken,
): Record<string, CSSInterpolation> => {
  const { antCls, componentCls } = token;
  return {
    [`${antCls}-form-item`]: {
      [`&${componentCls}-item-read-mode:not(${componentCls}-item-no-label)`]: {
        [`> ${antCls}-form-item-row`]: {
          [`> ${antCls}-form-item-control`]: {
            [`> ${antCls}-form-item-control-input`]: {
              [`> ${antCls}-form-item-control-input-content`]: {
                /*
                    Copied styles from 'ant-input' class
                  */
                boxSizing: 'border-box',
                margin: 0,
                fontVariant: 'tabular-nums',
                listStyle: 'none',
                fontFeatureSettings: "'tnum', 'tnum'",
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                minWidth: 0,
                padding: '4px 11px',
                color: token.colorText,
                fontSize: token.fontSize,
                lineHeight: token.lineHeight,
                backgroundColor: token.colorBgContainer,
                backgroundImage: 'none',
                border: `1px solid ${token.colorBorder}`,
                borderRadius: '2px',
                transition: 'all 0.3s',
              },
            },
          },
        },
      },
    },
  };
};
