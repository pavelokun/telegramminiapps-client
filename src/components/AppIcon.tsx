import { Icon, IIconProps } from 'native-base';
import { memo } from 'react';

export enum AppIconAs {
  InputLeft = 'input-left',
  InputRight = 'input-right',
}

export type AppIconProps = IIconProps & {
  source: any;
  as?: AppIconAs;
};

export const AppIcon = memo<AppIconProps>((props) => {
  const { source, as, ...restProps } = props;
  const targetProps: Partial<IIconProps> = {};
  if (as === AppIconAs.InputLeft) {
    targetProps.ml = 3;
    targetProps.size = 5;
  }
  return <Icon as={source} {...targetProps} {...restProps} />;
});
