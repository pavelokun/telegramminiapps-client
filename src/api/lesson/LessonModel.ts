import { model, ResourceModel } from '@artsiombarouski/rn-resources';
import { AttachmentDto, CourseLessonAssets } from '@/src/api/course/types';

@model()
export class LessonModel extends ResourceModel {
  get sectionId(): string | undefined {
    return this.get('sectionId');
  }

  get courseId(): string | undefined {
    return this.get('courseId');
  }

  get title(): string | undefined {
    return this.get('title');
  }

  get description(): string | undefined {
    return this.get('description');
  }

  get assets(): CourseLessonAssets | undefined {
    return this.get('assets');
  }

  get order(): number {
    return this.get('order') ?? 0;
  }

  get content(): AttachmentDto | undefined {
    return this.get('Content');
  }
}
