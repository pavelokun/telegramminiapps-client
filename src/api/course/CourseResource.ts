import { Resource, ResourceApi } from '@artsiombarouski/rn-resources';
import { service } from '@artsiombarouski/rn-services';
import { CourseModel } from '@/src/api/course/CourseModel';

@service()
export class CourseResource extends Resource<CourseModel> {
  constructor() {
    super(() => CourseModel, ResourceApi.create('/courses'));
  }
}
