import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          top: -8,
        },
      }}
    >
      <Tabs.Screen
        name={'courses'}
        options={{
          title: 'Курсы',
          tabBarIcon: (props) => (
            <Icon
              as={MaterialCommunityIcons}
              name={'bookshelf'}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={'products'}
        options={{
          title: 'Товары',
          tabBarIcon: (props) => (
            <Icon
              as={MaterialCommunityIcons}
              name={'shopping'}
              color={props.color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
