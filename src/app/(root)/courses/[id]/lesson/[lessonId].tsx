import React from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { CourseLessonView } from '@/src/components';
import { observer } from 'mobx-react-lite';

const CourseLessonPage = observer(() => {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  if (!lessonId) {
    return <Redirect href={'/'} />;
  }
  return <CourseLessonView lessonId={lessonId} />;
});

export default CourseLessonPage;
