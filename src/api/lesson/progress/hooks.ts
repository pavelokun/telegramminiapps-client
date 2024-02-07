import axios from 'axios';
import {
  useMutation,
  useQuery,
  QueryKey,
  useQueryClient,
} from '@tanstack/react-query';
import { API_URL } from '@/src/constants/Env';
import { LessonProgressModel } from '@/src/api/lesson';

export const useStartLesson = () => {
  return useMutation(
    ({ userId, lessonId }: { userId: string; lessonId: string }) =>
      axios
        .post(`${API_URL}/lesson-progresses/start-lesson`, {
          userId,
          lessonId,
        })
        .then((res) => res.data),
  );
};

export const useCompleteLesson = (onMutationSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      userId,
      lessonId,
      courseId,
    }: {
      userId: string;
      lessonId: string;
      courseId: string;
    }) =>
      axios
        .post(`${API_URL}/lesson-progresses/complete-lesson`, {
          userId,
          lessonId,
        })
        .then((res) => res.data),
    {
      onSuccess: (data, variables) => {
        // Invalidate the useLessonProgress query so it will refetch
        const queryKey: QueryKey = [
          'lessonProgress',
          variables.userId,
          variables.lessonId,
        ];
        queryClient.invalidateQueries(queryKey);

        if (variables.courseId) {
          const courseProgressQueryKey: QueryKey = [
            'courseProgress',
            variables.userId,
            variables.courseId,
          ];
          queryClient.invalidateQueries(courseProgressQueryKey);
        }

        onMutationSuccess?.();
      },
    },
  );
};

export const useLessonProgress = ({
  userId,
  lessonId,
}: {
  userId: string;
  lessonId: string;
}) => {
  const queryKey: QueryKey = ['lessonProgress', userId, lessonId];
  return useQuery<LessonProgressModel>(queryKey, () =>
    axios
      .get(`${API_URL}/lesson-progresses/${userId}/${lessonId}`)
      .then((res) => res.data),
  );
};
