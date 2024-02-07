import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading } from 'native-base';
import { isNothing } from '@/src/utils/Common.utils';
import { CourseLessonVideoElement } from './CourseLessonVideoElement';
import { CourseLessonCompleteToggleButton } from '@/src/components';
import { LessonModel, LessonProgressModel } from '@/src/api/lesson';
import { observer } from 'mobx-react-lite';
import { RichTextView } from '@/src/components/core/RichTextView';

export type CourseLessonPageProps = {
  model: LessonModel;
};

type CourseLessonPageContentProps = CourseLessonPageProps & {
  maxWidth?: number;
  progress?: LessonProgressModel;
};

export const CourseLessonPageContent = observer<CourseLessonPageContentProps>(
  (props) => {
    const { model, maxWidth, progress } = props;
    const hasVideoContent = !!model.content?.video;
    return (
      <View style={styles.container}>
        <View style={[styles.titleContainer, { maxWidth }]}>
          <Heading style={styles.title}>{model.title}</Heading>
        </View>
        {hasVideoContent && <CourseLessonVideoElement model={model} />}
        <View style={[styles.contentContainer, { maxWidth }]}>
          {!isNothing(model.description) && (
            <RichTextView data={model.description} />
          )}
          <CourseLessonCompleteToggleButton
            model={progress}
            style={styles.completeButton}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 24,
  },
  titleContainer: {
    marginBottom: 24,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  title: { flex: 1 },
  contentContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  completeButton: {
    alignSelf: 'center',
    minWidth: 240,
    marginTop: 24,
  },
});
