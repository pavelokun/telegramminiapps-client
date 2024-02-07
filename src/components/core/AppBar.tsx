import React from 'react';
import { Button, HStack, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const AppBar = () => {
  const router = useRouter();

  return (
    <HStack>
      <Button
        colorScheme={'black'}
        variant={'link'}
        onPress={() => router.back()}
        leftIcon={
          <Icon as={MaterialCommunityIcons} name={'chevron-left'} size={8} />
        }
      >
        Назад
      </Button>
    </HStack>
  );
};
