import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { useRouteGuard } from '@artsiombarouski/rn-expo-router-service';
import { useUsers } from '@/src/services/hooks/useUsers';

export const RouteGuardLayout = observer((props: PropsWithChildren) => {
  const users = useUsers();
  useRouteGuard(
    {
      getRedirect: (segments) => {
        if (!users.currentUser && !segments.includes('(auth)')) {
          return '/login';
        }
        return null;
      },
    },

    [users.currentUser],
  );
  return <>{props.children}</>;
});
