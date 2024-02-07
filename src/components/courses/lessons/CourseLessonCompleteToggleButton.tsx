import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'native-base';
import { AppIcon, CourseLessonCompleteDialogView } from '@/src/components';
import { icDoubleCheck } from '@/assets';
import {
  LessonProgressModel,
  useCompleteLesson,
  useLesson,
} from '@/src/api/lesson';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { useLocalSearchParams } from 'expo-router';
import { ModalDialog } from '@artsiombarouski/rn-components';

type CourseLessonCompleteToggleButtonProps = {
  model?: LessonProgressModel;
  style?: StyleProp<ViewStyle>;
};

export const CourseLessonCompleteToggleButton =
  observer<CourseLessonCompleteToggleButtonProps>((props) => {
    const { model } = props;
    const user = useUserInfo();
    const { id, lessonId } = useLocalSearchParams<{
      id: string;
      lessonId: string;
    }>();

    //todo: change on resources
    const { data: lessonModel } = useLesson({ lessonId: lessonId! });
    const onCourseLessonComplete = () => {
      ModalDialog.show({
        content: (props) => (
          <CourseLessonCompleteDialogView lesson={lessonModel} {...props} />
        ),
        showActions: false,
      });
    };

    const completeLessonMutation = useCompleteLesson(onCourseLessonComplete);
    const handleCompleteLesson = () => {
      completeLessonMutation.mutate({
        userId: user?.id!,
        lessonId: lessonId!,
        courseId: id!,
      });
    };

    const completed = model?.completed;

    return (
      <Button
        size={'lg'}
        leftIcon={
          completed ? (
            <AppIcon source={icDoubleCheck} size={6} color={'white'} />
          ) : undefined
        }
        onPress={handleCompleteLesson}
        _text={{
          fontWeight: 'bold',
        }}
        alignSelf={'center'}
        minW={240}
        variant={completed ? 'solid' : 'outline'}
        mt={6}
      >
        {completed ? 'Выполнено' : 'Завершить'}
      </Button>
    );
  });
