import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { ModalDialogContentProps } from '@artsiombarouski/rn-components';
import { Button, Text, VStack } from 'native-base';
import { LessonDto } from '@/src/api/lesson';
import { useRouter } from 'expo-router';

type CourseLessonCompleteDialogViewProps = ModalDialogContentProps & {
  lesson: LessonDto | undefined;
};

export const CourseLessonCompleteDialogView =
  observer<CourseLessonCompleteDialogViewProps>((props) => {
    const { lesson, onOkClick, onCancelClick } = props;
    const router = useRouter();

    //todo: add CourseLessonInteractions
    const handleNextLessonClick = useCallback(() => {
      onOkClick();
      router.push(
        `/courses/${lesson?.nextLesson.courseId}/lesson/${lesson?.nextLesson.id}`,
      );
    }, [lesson?.nextLesson]);

    const handleBackPress = useCallback(() => {
      onCancelClick();
      router.replace(`/courses/${lesson?.nextLesson.courseId}`);
    }, []);

    return (
      <VStack space={6}>
        {lesson?.nextLesson ? (
          <>
            <VStack>
              <Text fontSize={24} fontWeight={'bold'} textAlign={'center'}>
                Отлично!
              </Text>
              <Text fontSize={24} fontWeight={'bold'} textAlign={'center'}>
                "{lesson.currentLesson.title}" пройден
              </Text>
            </VStack>
            <Button.Group direction={'column'} space={6}>
              <Button
                onPress={handleNextLessonClick}
                _text={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {`Перейти к ${lesson.nextLesson.title}`}
              </Button>
              <Button
                _text={{
                  fontWeight: 'bold',
                }}
                p={0}
                colorScheme={'black'}
                variant={'link'}
                onPress={handleBackPress}
              >
                Назад к курсу
              </Button>
            </Button.Group>
          </>
        ) : (
          <>
            <Text fontSize={24} fontWeight={'bold'} textAlign={'center'}>
              You have successfully completed the course. Congratulations!
            </Text>
            <Button
              onPress={handleBackPress}
              _text={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Назад к урокам
            </Button>
          </>
        )}
      </VStack>
    );
  });
