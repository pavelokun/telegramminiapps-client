import { ResourceModel, model } from '@artsiombarouski/rn-resources';
import { computed } from 'mobx';
import { CourseSectionAssets } from '@/src/api/course/types';
import { LessonModel } from '@/src/api/lesson';

@model()
export class CourseSectionModel extends ResourceModel {
  get title(): string | undefined {
    return this.get('title');
  }

  get description(): string | undefined {
    return this.get('description');
  }

  get assets(): CourseSectionAssets | undefined {
    return this.get('assets');
  }

  get order(): number {
    return this.get('order') ?? 0;
  }

  @computed
  get lessons(): LessonModel[] {
    return this.get('lessons') ?? [];
  }

  @computed
  get isCompleted(): boolean {
    //TODO
    //const progress = this.progress;
    //  return (
    //     progress && progress.total_lessons === progress.total_completed_lessons
    // );
    return true;
  }

  get courseId(): string | undefined {
    return this.get('courseId');
  }
}
