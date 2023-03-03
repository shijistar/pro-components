import { CSSObject } from 'antd-style';
import { ProListToken } from '.';

export const getCustomizedStyle = (token: ProListToken): CSSObject => {
  return {
    [`&${token.componentCls}-full-height`]: {
      height: '100%',

      [`& > ${token.proComponentsCls}-card`]: {
        height: '100%',

        [`& > ${token.proComponentsCls}-card-body`]: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',

          [`& > ${token.antCls}-table-wrapper`]: {
            flex: 'auto',
            minHeight: 0,
          },
        },
      },
    },
    [`&${token.componentCls}-has-pagination`]: {
      [`${token.antCls}-table-wrapper + button`]: {
        marginTop: '16px !important', // 增加添加按钮的marginTop，为了与pagination的margin保持一致
      },
    },
    [`&${token.componentCls}-has-creator`]: {
      [`${token.antCls}-table-wrapper`]: {
        [`${token.antCls}-table-pagination`]: {
          marginBottom: 0, // 存在添加按钮时，去掉分页组件的marginBottom
        },
      },
    },
    [`& > ${token.proComponentsCls}-card${token.proComponentsCls}-card-ghost`]: {
      [`& > ${token.proComponentsCls}-card-body`]: {
        [`& > ${token.antCls}-table-wrapper + button`]: {
          marginBottom: '0 !important', // ghost模式下不要添加按钮的marginBottom
        },
      },
    },
    [`&${token.componentCls}-has-pagination:not(${token.componentCls}-has-creator)`]: {
      [`& > ${token.proComponentsCls}-card${token.proComponentsCls}-card-ghost`]: {
        [`& > ${token.proComponentsCls}-card-body`]: {
          [`& > ${token.antCls}-table-wrapper`]: {
            [`${token.antCls}-table-pagination`]: {
              marginBottom: 0, // 在ghost模式下，存在分页但不存在添加按钮时，去掉分页组件的marginBottom
            },
          },
        },
      },
    },
  };
};
