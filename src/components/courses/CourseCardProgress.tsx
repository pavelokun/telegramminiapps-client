import React from 'react';
import { observer } from 'mobx-react-lite';
import { CourseModel, useCourseProgress } from '@/src/api/course';
import { HStack, Progress, Text, Box, IBoxProps } from 'native-base';
import { isNothing } from '@artsiombarouski/rn-resources';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';

type CourseCardProgressProps = IBoxProps & {
  model: CourseModel;
};

export const CourseCardProgress = observer<CourseCardProgressProps>((props) => {
  const { model, ...restProps } = props;
  const user = useUserInfo();

  //todo: change on resource
  const { data: courseProgress } = useCourseProgress({
    userId: user?.id!,
    courseId: model.id,
  });

  if (isNothing(courseProgress) || isNothing(model?.totalLessons)) {
    return <></>;
  }

  const progressFloat =
    (courseProgress?.totalCompletedLessons! / model?.totalLessons!) * 100;

  return (
    <Box w={'100%'} {...restProps}>
      {courseProgress?.completed ? (
        <HStack alignItems={'center'}>
          {/*todo: add checked icon*/}
          <Text>Завершено</Text>
        </HStack>
      ) : (
        <Progress value={progressFloat ?? 0} />
      )}
    </Box>
  );
});
