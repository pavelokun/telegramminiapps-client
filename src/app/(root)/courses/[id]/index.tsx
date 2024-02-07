import React, { useEffect } from 'react';
import { Box, ScrollView, VStack } from 'native-base';
import { useLocalSearchParams } from 'expo-router';
import {
  CourseContentElement,
  CourseInfoElement,
} from '@/src/components/courses/info';
import { observer } from 'mobx-react-lite';
import { useResourceModel } from '@artsiombarouski/rn-resources';
import { useService } from '@artsiombarouski/rn-services';
import {
  CourseResource,
  useCourseProgress,
  useStartCourse,
} from '@/src/api/course';
import { isEmpty } from 'lodash';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { CourseProgressElement } from '@/src/components/courses/info/components';
import { AppBar } from '@/src/components/core/AppBar';

const CoursePage = observer(() => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = useUserInfo();
  const courseResource = useService(CourseResource);
  const { model } = useResourceModel(id, courseResource.store, {
    include: ['sections'],
    sort: ['sections.order:ASC', 'sections.lessons.order:ASC'],
  });

  //todo: change to service/resource
  const { data, isLoading } = useCourseProgress({
    userId: user?.id!,
    courseId: model.id,
  });
  const startCourseMutation = useStartCourse();
  const handleStartCourse = () => {
    startCourseMutation.mutate({ userId: user?.id!, courseId: model.id });
  };

  useEffect(() => {
    if (isEmpty(data) && !isLoading) {
      handleStartCourse();
    }
  }, [data, isLoading]);

  return (
    <Box flex={1} bgColor={'#F5F5F5'}>
      {/*todo: add appbar to layout*/}
      <AppBar />
      <ScrollView px={4}>
        <VStack space={6}>
          <CourseInfoElement model={model} />
          <CourseProgressElement model={model} />
          <CourseContentElement desktop={false} model={model} />
        </VStack>
      </ScrollView>
    </Box>
  );
});

export default CoursePage;
