import { GenerateStyle } from '@ant-design/pro-provider';
import { ProLayoutToken } from './style';

export const genCustomGlobalHeaderStyle: GenerateStyle<ProLayoutToken> = (
  token,
) => {
  return {
    [token.componentCls]: {
      marginInline: 24,

      '&-logo': {
        marginInlineEnd: '24px',
      },
    },
  };
};
