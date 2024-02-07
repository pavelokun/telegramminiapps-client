export type AssetsDto = {
  cover?: string;
};

export type CourseProgressDto = {
  total_lessons: number;
  total_started_lessons: number;
  total_completed_lessons: number;
  last_started_lesson_id: string;
  completed: boolean;
};

export type CourseSectionAssets = {
  cover?: string;
  trailer?: string;
};

export type CourseLessonAssets = {
  cover?: string;
  trailer?: string;
};

export type AttachmentDto = {
  video?: string;
};
