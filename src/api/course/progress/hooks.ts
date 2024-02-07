import axios from 'axios';
import {
  useMutation,
  useQuery,
  QueryKey,
  useQueryClient,
} from '@tanstack/react-query';
import { API_URL } from '@/src/constants/Env';
import { CourseProgressModel } from '@/src/api/course';

export const useStartCourse = (onMutationSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, courseId }: { userId: string; courseId: string }) =>
      axios
        .post(`${API_URL}/course-progresses`, { userId, courseId })
        .then((res) => res.data),
    {
      onSuccess: (data, variables) => {
        // Invalidate the useCourseProgress query so it will refetch
        const queryKey: QueryKey = [
          'courseProgress',
          variables.userId,
          variables.courseId,
        ];
        queryClient.invalidateQueries(queryKey);

        onMutationSuccess?.();
      },
    },
  );
};

export const useCourseProgress = ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  const queryKey: QueryKey = ['courseProgress', userId, courseId];
  return useQuery<CourseProgressModel>(queryKey, () =>
    axios
      .get(`${API_URL}/course-progresses/${userId}/${courseId}`)
      .then((res) => res.data),
  );
};
