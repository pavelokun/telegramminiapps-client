import React, { ReactElement, useCallback, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { isArray } from 'lodash';

export type AppFillColumnRender<ItemT> = (info: {
  item: ItemT;
  index: number;
}) => React.ReactElement | null;

export interface AppFillColumnProps<T> {
  data?: T[];
  children?: ReactElement | ReactElement[];
  spacing?: number;
  renderItem: AppFillColumnRender<T>;
  style?: StyleProp<ViewStyle>;
  divider?: ReactElement;
}

export function AppFillColumn<T>(props: AppFillColumnProps<T>) {
  const { data, spacing, renderItem, children, style, divider } = props;

  const itemsToRender = useMemo<ReactElement[]>(() => {
    const result = [];
    data?.map((item, index) => {
      result.push(renderItem({ item, index }));
    });
    if (isArray(children)) {
      result.push(...children.filter((e) => e));
    } else if (children) {
      result.push(children);
    }
    return result;
  }, [data, children, renderItem]);

  const wrapElement = useCallback(
    (view: ReactElement, index: number) => {
      const shouldRenderDivider = divider && index < itemsToRender.length - 1;

      return (
        <View
          key={`e_${index}`}
          style={{
            marginBottom: index < itemsToRender.length - 1 ? spacing : 0,
          }}
        >
          {view}
          {shouldRenderDivider && divider}
        </View>
      );
    },
    [spacing, itemsToRender],
  );

  return (
    <View
      style={[
        { display: 'flex', flexDirection: 'column', width: '100%' },
        style,
      ]}
    >
      {itemsToRender.map((child, index) => wrapElement(child, index))}
    </View>
  );
}
