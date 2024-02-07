import { Resource, ResourceApi } from '@artsiombarouski/rn-resources';
import { service } from '@artsiombarouski/rn-services';
import { CourseProgressModel } from '@/src/api/course/progress/CourseProgressModel';

@service()
export class CourseProgressResource extends Resource<CourseProgressModel> {
  constructor() {
    super(() => CourseProgressModel, ResourceApi.create('/course-progresses'));
  }
}
