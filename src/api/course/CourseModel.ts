import { model, ResourceModel } from '@artsiombarouski/rn-resources';
import { AssetsDto } from '@/src/api/course/types';
import { CourseSectionModel } from '@/src/api/course/CourseSectionModel';

@model()
export class CourseModel extends ResourceModel {
  get title() {
    return this.get<string>('title');
  }
  get description() {
    return this.get<string>('description');
  }

  get assets() {
    return this.get<AssetsDto>('assets');
  }

  //todo: update totalLessons on server
  get totalLessons(): number | undefined {
    return this.get('totalLessons');
  }

  get sections(): CourseSectionModel[] {
    return this.get('sections') ?? [];
  }
}
