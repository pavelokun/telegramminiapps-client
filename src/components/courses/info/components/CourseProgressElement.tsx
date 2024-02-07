import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { CourseModel, useCourseProgress } from '@/src/api/course';
import { Progress, Text, VStack } from 'native-base';
import { isNothing } from '@artsiombarouski/rn-resources';

type CourseProgressElementProps = {
  model: CourseModel;
  style?: StyleProp<ViewStyle>;
};

export const CourseProgressElement = observer<CourseProgressElementProps>(
  (props) => {
    const { model } = props;
    const user = useUserInfo();

    //todo: change on resource; add loading, error
    const { data: courseProgress } = useCourseProgress({
      userId: user?.id!,
      courseId: model.id,
    });

    if (isNothing(courseProgress) || isNothing(model?.totalLessons)) {
      return <></>;
    }

    const progressFloat = !isNothing(courseProgress)
      ? (courseProgress?.totalCompletedLessons! / model?.totalLessons!) * 100
      : 0;

    return (
      <VStack style={styles.container} space={4}>
        <View style={styles.textContainer}>
          <Text flex={1} fontWeight={'bold'}>
            {Math.ceil(progressFloat)}% Пройдено
          </Text>
        </View>
        <Progress value={progressFloat ?? 0} />
      </VStack>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
