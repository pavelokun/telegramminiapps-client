import React from 'react';
import { Center, Spinner } from 'native-base';

export const Loader = () => {
  return (
    <Center flex={1}>
      <Spinner flex={0.5} size="lg" color="indigo.500" />
    </Center>
  );
};
