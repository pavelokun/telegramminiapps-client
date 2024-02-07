import React, { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Column, Heading } from 'native-base';
import { Loader } from '@/src/components/core/Loader';
import { UserAuthController, useUserAuthFinalize } from '@/src/services/auth';
import { useTelegram } from '@/src/services/hooks';

const Login = observer(() => {
  const { tg } = useTelegram();
  const finalizeAuth = useUserAuthFinalize();
  const controller = useLocalObservable(() => new UserAuthController());
  const handleSubmit = (value: string) => {
    return controller.login({ initData: value }).then(finalizeAuth);
  };

  useEffect(() => {
    //todo: add local flag
    handleSubmit(
      true
        ? (process.env.EXPO_PUBLIC_TELEGRAM_INIT_DATA as string)
        : tg.initData,
    );
  }, []);

  if (controller.error) {
    const { error } = controller;
    return (
      <Column space={1}>
        <Heading size={'sm'}>
          {error?.title ?? error?.message ?? 'Oops, something went wrong'}
        </Heading>
      </Column>
    );
  }

  if (controller.isSubmitting) {
    return <Loader />;
  }

  return <Loader />;
});

export default Login;
