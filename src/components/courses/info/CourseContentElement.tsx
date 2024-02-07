import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import {
  CourseSectionElement,
  CourseSectionElementProps,
} from './components/CourseSectionElement';
import { observer } from 'mobx-react-lite';
import { CourseModel } from '@/src/api/course';
import { CourseSectionModel } from '@/src/api/course/CourseSectionModel';

type CourseContentElementProps = Pick<
  CourseSectionElementProps,
  'onLessonLayout'
> & {
  model: CourseModel;
  style?: StyleProp<ViewStyle>;
  desktop?: boolean;
};

export const CourseContentElement = observer<CourseContentElementProps>(
  (props) => {
    const { model: courseModel, style, desktop, onLessonLayout } = props;
    const renderSection = (model: CourseSectionModel, index: number) => {
      return (
        <CourseSectionElement
          key={model.id}
          model={model}
          onLessonLayout={onLessonLayout}
          initialExpanded={true} //todo: add logic
          useDesktop={desktop}
        />
      );
    };

    return (
      <View style={[styles.container, style]}>
        {courseModel?.sections?.map(renderSection)}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
