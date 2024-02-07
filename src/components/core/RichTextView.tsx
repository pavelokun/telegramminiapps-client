import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'native-base';
import { isNothing } from '@/src/utils/Common.utils';
import { isWeb } from '@/src/utils/Platform.utils';

type Props = {
  data?: string;
  style?: StyleProp<ViewStyle>;
};

export const RichTextView = (props: Props) => {
  const { data, style } = props;
  const theme = useTheme();
  if (isNothing(data)) {
    return <></>;
  }
  if (isWeb) {
    return (
      <div
        style={StyleSheet.flatten([
          {
            color: theme.colors.text,
            overflowWrap: 'break-word',
          },
          style as any,
        ])}
        dangerouslySetInnerHTML={{
          __html: data ?? '',
        }}
      />
    );
  }
  return <View style={style}>{data}</View>;
};
