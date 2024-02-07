import { Resource, ResourceApi } from '@artsiombarouski/rn-resources';
import { service } from '@artsiombarouski/rn-services';
import { LessonModel } from '@/src/api/lesson/LessonModel';

@service()
export class LessonResource extends Resource<LessonModel> {
  constructor() {
    super(() => LessonModel, ResourceApi.create('/lessons'));
  }
}
