import React from 'react';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export const AppThemeProvider = (props: { children: any }) => {
  document.getElementById('root')!.style.height = '100vh';
  const theme = extendTheme({
    colors: {
      primary: {
        '100': '#E9ECFF',
        '200': '#D2D9FF',
        '300': '#ABB5FF',
        '400': '#858FFF',
        '500': '#5F6BFF',
        '600': '#5D74FF',
        '700': '#4A5BCF',
        '800': '#3843A0',
        '900': '#282B70',
      },
    },
    components: {
      Box: {
        variants: {
          card: {
            borderRadius: 6,
            borderWidth: 1,
            borderColor: 'coolGray.200',
          },
        },
      },
      Button: {
        baseStyle: {
          borderRadius: 8,
        },
      },
    },
  });
  return (
    <ThemeProvider value={navigationTheme}>
      <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
    </ThemeProvider>
  );
};
