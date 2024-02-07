import React from 'react';
import { Box, Heading, Text, Image, Stack, Button } from 'native-base';
import { AppIcon } from '@/src/components';
import { icPlay } from '@/assets';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { CourseModel, useCourseProgress } from '@/src/api/course';
import { StyleSheet } from 'react-native';

type CourseInfoElementProps = {
  model: CourseModel;
};

export const CourseInfoElement = observer<CourseInfoElementProps>((props) => {
  const { model } = props || {};
  const router = useRouter();
  const user = useUserInfo();

  //todo: change on resource
  const { data } = useCourseProgress({
    userId: user?.id!,
    courseId: model.id,
  });

  const goToLesson = () => {
    router.push(
      `/courses/${model.id}/lesson/${
        data?.lastStartedLessonId
          ? data.lastStartedLessonId
          : model.sections[0].lessons[0].id
      }`, //todo: change condition
    );
  };

  return (
    <Box rounded="lg" overflow="hidden" bg={'white'}>
      <Box style={styles.imageContainer}>
        <Image
          source={{
            uri: model?.assets?.cover,
          }}
          w={'100%'}
          h={'100%'}
        />
      </Box>
      <Stack p="4" space={3}>
        <Heading size="md">{model.title}</Heading>
        <Text fontWeight="400">{model.description}</Text>
        <Button
          mt={6}
          leftIcon={<AppIcon source={icPlay} />}
          onPress={goToLesson}
          _text={{
            fontWeight: 'bold',
          }}
        >
          {data?.lastStartedLessonId
            ? `Перейти к ${data.lastStartedLessonTitle}`
            : 'Начать'}
        </Button>
      </Stack>
    </Box>
  );
});

const styles = StyleSheet.create({
  imageContainer: {
    aspectRatio: 16 / 9,
    width: '100%',
  },
});
