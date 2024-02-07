import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { observer } from 'mobx-react-lite';
import { LessonModel } from '@/src/api/lesson';

type CourseLessonVideoElementProps = {
  model: LessonModel;
};
export const CourseLessonVideoElement = observer<CourseLessonVideoElementProps>(
  (props) => {
    const { model } = props || {};
    const video = React.useRef(null);

    return (
      <View style={styles.container}>
        <Video
          ref={video}
          videoStyle={styles.video}
          style={styles.videoContainer}
          source={{
            uri: model.content?.video!,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
