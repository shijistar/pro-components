import { GenerateStyle } from '@ant-design/pro-components';
import { ProCardToken } from './components/Card/style';

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
