import { model, ResourceModel } from '@artsiombarouski/rn-resources';

@model()
export class CourseProgressModel extends ResourceModel {
  get courseId() {
    return this.get<string>('courseId');
  }

  get totalLessons() {
    return this.get<number>('totalLessons');
  }

  get totalStartedLessons() {
    return this.get<number>('totalStartedLessons');
  }

  get totalCompletedLessons() {
    return this.get<number>('totalCompletedLessons');
  }

  get lastStartedLessonId() {
    return this.get<string>('lastStartedLessonId');
  }

  get lastStartedLessonTitle() {
    return this.get<string>('lastStartedLessonTitle');
  }

  get completed() {
    return this.get<boolean>('completed');
  }
}
