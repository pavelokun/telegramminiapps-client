import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useUsers } from '@/src/services/hooks/useUsers';
import {
  ServiceContainer,
  ServiceContainerBootstrap,
} from '@artsiombarouski/rn-services';
import { rootServiceContainer, scopedServiceContainer } from '@/src/services';
import { observe } from 'mobx';
import { RouteGuardLayout } from '@/src/components/root/RouteGuardLayout';

const AppUserServiceWrapper = ({ children }: PropsWithChildren) => {
  const users = useUsers();
  const [currentContainer, setCurrentContainer] = useState<{
    userKey?: string;
    container: ServiceContainer;
  }>({
    userKey: users.currentUser?.key,
    container: scopedServiceContainer(),
  });

  useEffect(() => {
    const unsubscribe = observe(users, 'currentUser', (change) => {
      const newKey = change.newValue?.key;
      if (newKey !== currentContainer?.userKey) {
        currentContainer?.container?.destroy();
        setCurrentContainer({
          userKey: newKey,
          container: scopedServiceContainer(),
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [users, currentContainer]);
  //todo: move RouteGuardLayout
  return (
    <ServiceContainerBootstrap container={currentContainer.container}>
      <RouteGuardLayout>{children}</RouteGuardLayout>
    </ServiceContainerBootstrap>
  );
};

export const AppServiceWrapper = ({ children }: PropsWithChildren) => {
  const [servicesContainer] = useState(rootServiceContainer());

  return (
    <ServiceContainerBootstrap container={servicesContainer}>
      <AppUserServiceWrapper>{children}</AppUserServiceWrapper>
    </ServiceContainerBootstrap>
  );
};
