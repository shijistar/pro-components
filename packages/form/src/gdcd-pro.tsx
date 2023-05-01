import { useContext } from 'react';
import classNames from 'classnames';
import { ConfigProvider, FormItemProps } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider';
import { ProAliasToken, ProProvider } from '@ant-design/pro-provider';
import { CSSInterpolation } from '@ant-design/cssinjs';
import { ExtendsProps, ProFormFieldItemProps, ProFormItemCreateConfig } from './typing';
import { EditOrReadOnlyContext } from './BaseForm/EditOrReadOnlyContext';

export type CustomizedProFormItemProps = {
  /**
   * 只读模式下，是否为控件值添加边框。
   *
   * 对于单列的表单，如果没有边框，内容主要都集中在左侧，右侧比较空，页面比例不太协调。
   *
   * 如果表单是纵向排列的，建议设置为 `false`。
   *
   * @default `false`
   *
   * @type {boolean}
   */
  readonlyBorder?: boolean;
};
export const useFormItemPropsForCreateField = (
  props: ProFormFieldItemProps & ExtendsProps,
  config?: ProFormItemCreateConfig,
) => {
  const { readonlyBorder = false } = props;
  // 优先尝试Ant Design V5 Token System 构建的业务级 css-in-js 解决方案

  const { token = {} as ProAliasToken /* hashId = '', theme */ } = useContext(ProProvider);
  const { getPrefixCls } = useContext(ConfigContext || ConfigProvider.ConfigContext);
  const proComponentsCls = token.proComponentsCls?.replace(/^\./, '') ?? `${getPrefixCls('pro')}`;
  const modeContext = useContext(EditOrReadOnlyContext);
  const readonly =
    props.readonly ||
    props.proFieldProps?.readonly ||
    props.proFieldProps?.mode ||
    modeContext?.mode === 'read';
  const label = props.formItemProps?.label || props.label;
  return {
    customizedFormItemProps: {
      className: classNames(
        props.className,
        readonlyBorder && readonly && `${proComponentsCls}-form-item-read-mode`,
        !label && `${proComponentsCls}-form-item-no-label`,
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
                minHeight: token.fontSize * token.lineHeight + 10 /* padding*2 + border*2 */,
                padding: '4px 11px',
                color: token.colorText,
                fontSize: token.fontSize,
                lineHeight: token.lineHeight,
                backgroundColor: token.colorBgContainer,
                backgroundImage: 'none',
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadius || '2px',
                transition: 'all 0.3s',
              },
            },
          },
        },
      },
    },
  };
};
