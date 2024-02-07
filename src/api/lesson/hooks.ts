import axios from 'axios';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { API_URL } from '@/src/constants/Env';
import { LessonModel } from '@/src/api/lesson/LessonModel';

export type LessonDto = {
  //todo: change in future
  currentLesson: LessonModel;
  prevLesson: LessonModel;
  nextLesson: LessonModel;
};

export const useLesson = ({ lessonId }: { lessonId: string }) => {
  const queryKey: QueryKey = ['lesson', lessonId];

  return useQuery<LessonDto>(queryKey, () =>
    axios.get(`${API_URL}/lessons/${lessonId}`).then((res) => res.data),
  );
};
