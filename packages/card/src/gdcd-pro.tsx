import { GenerateStyle } from '@ant-design/pro-components';
import { ProCardToken } from './components/Card/style';
import { ProListToken } from './components/CheckCard/style';

export const genCustomProCardStyle: GenerateStyle<ProCardToken> = (token) => {
  const { componentCls } = token;
  return {
    [token.componentCls]: {
      [`${componentCls}-header`]: {
        paddingInline: 16,

        // '&-border': {
        //   '&': {
        //     paddingBlockEnd: 8,
        //   },
        // },
      },

      '&&-ghost': {
        [`> ${componentCls}`]: {
          '&-header': {
            '&-border': {
              '&': {
                marginBlockEnd: 16,
              },
            },
          },
        },
      },
    },
  };
};

export const genCheckCardProStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      '&-title': {
        fontWeight: '600',
      },
      '&-checked': {
        backgroundColor: '#e7f1ff',
      },
    },
  };
};
