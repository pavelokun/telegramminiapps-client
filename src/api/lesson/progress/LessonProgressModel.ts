import { model, ResourceModel } from '@artsiombarouski/rn-resources';

@model()
export class LessonProgressModel extends ResourceModel {
  get lessonId() {
    return this.get<string>('lessonId');
  }

  get completed() {
    return this.get<boolean>('completed');
  }

  get mediaProgress() {
    return this.get<number>('mediaProgress');
  }
}
