import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Center, ScrollView, Spacer, Spinner, View, Text } from 'native-base';
import { CourseLessonPageContent } from '@/src/components';
import { CourseLessonSwitchButton } from '@/src/components/courses/lessons/CourseLessonSwitchButton';
import { isEmpty } from 'lodash';
import { useLesson, useLessonProgress, useStartLesson } from '@/src/api/lesson';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { observer } from 'mobx-react-lite';

type CourseLessonViewProps = {
  lessonId: string;
};

export const CourseLessonView = observer<CourseLessonViewProps>((props) => {
  const { lessonId } = props;
  const user = useUserInfo();

  //todo: add lesson and lesson-progress resources
  const { isLoading, error, data: model } = useLesson({ lessonId: lessonId });
  const {
    data: progress,
    error: progressError,
    isLoading: isProgressLoading,
  } = useLessonProgress({
    userId: user?.id!,
    lessonId: lessonId,
  });
  const startLessonMutation = useStartLesson();
  const handleStartLesson = () => {
    startLessonMutation.mutate({ userId: user?.id!, lessonId: lessonId });
  };

  useEffect(() => {
    if (isEmpty(progress) && !isProgressLoading) {
      handleStartLesson();
    }
  }, [progress, isProgressLoading]);

  if (isLoading || isProgressLoading)
    return (
      <Center flex={1}>
        <Spinner flex={0.5} size="lg" color="indigo.500" />
      </Center>
    );

  if (error || progressError)
    return (
      <Center flex={1}>
        <Text>{'An error has occurred'}</Text>
      </Center>
    );

  return (
    <View style={styles.contentWrapper}>
      <ScrollView
        style={styles.contentList}
        showsVerticalScrollIndicator={false}
      >
        <CourseLessonPageContent
          model={model?.currentLesson!}
          progress={progress}
        />
        <View style={styles.lessonSwitchInlineContainer}>
          <CourseLessonSwitchButton
            model={model}
            switchToNext={false}
            showTitle={true}
          />
          <Spacer />
          <CourseLessonSwitchButton
            model={model}
            switchToNext={true}
            showTitle={true}
          />
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  contentList: {
    width: '100%',
  },
  lessonSwitchInlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
  },
  lessonSwitchOverlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonSwitchButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
