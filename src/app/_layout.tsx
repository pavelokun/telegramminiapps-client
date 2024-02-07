import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppThemeProvider } from '../theme';
import { ShoppingCartProvider } from '@/src/components/ShoppingCartProvider';
import { AppServiceWrapper } from '@/src/components/app';
import {
  AlertProvider,
  ModalDialogProvider,
} from '@artsiombarouski/rn-components';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppServiceWrapper>
        <AppThemeProvider>
          <ShoppingCartProvider>
            <AlertProvider>
              <ModalDialogProvider>
                <Slot />
              </ModalDialogProvider>
            </AlertProvider>
          </ShoppingCartProvider>
        </AppThemeProvider>
      </AppServiceWrapper>
    </QueryClientProvider>
  );
}
