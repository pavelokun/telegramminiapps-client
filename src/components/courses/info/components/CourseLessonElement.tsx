import React, { useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Text, Image, Heading } from 'native-base';
import { isNothing } from '@/src/utils/Common.utils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { removeTagsAndEntities } from '@/src/utils/Html.utils';
import { LessonModel, useLessonProgress } from '@/src/api/lesson';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { AppIcon } from '@/src/components';
import { icCheck } from '@/assets';
import { observer } from 'mobx-react-lite';

type ContentPreviewProps = {
  model: LessonModel;
  canWatchLesson?: boolean;
  style?: StyleProp<ViewStyle>;
};

const ContentPreview = observer((props: ContentPreviewProps) => {
  const { model, canWatchLesson, style } = props;
  const user = useUserInfo();

  //todo: change to resource, add loading, error
  const { data: progress } = useLessonProgress({
    //todo: change to model
    userId: user?.id!,
    lessonId: model.id,
  });

  return (
    <View style={[styles.contentPreview, style]}>
      <Image style={styles.image} source={{ uri: model.assets?.cover }} />
      {canWatchLesson && progress?.completed && (
        <View style={styles.completedMarkContainer}>
          <View style={[styles.completedMark]}>
            <AppIcon source={icCheck} size={5} color={'primary.400'} />
          </View>
        </View>
      )}
    </View>
  );
});

type TextElementsProps = {
  model: LessonModel;
};

const TextElements = observer((props: TextElementsProps) => {
  const { model } = props;
  const decodedDescription = removeTagsAndEntities(model.description);
  return (
    <>
      <Heading size={'sm'}>{`${model.order + 1}. ${model.title}`}</Heading>
      {!isNothing(model.description) && (
        <Text style={[{ marginTop: 8 }]} color={'text.500'} numberOfLines={2}>
          {decodedDescription ?? model.description ?? ''}
        </Text>
      )}
    </>
  );
});

type Props = ViewProps & {
  model: LessonModel;
  style?: StyleProp<ViewStyle>;
};

export const CourseLessonElement = observer((props: Props) => {
  const { model, style, ...restProps } = props;
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`courses/${id}/lesson/${model.id}`);
  }, [model]);

  const canWatchLesson = true; //todo: add logic

  return (
    <TouchableOpacity
      style={[styles.containerVertical, style]}
      onPress={handleClick}
      {...restProps}
    >
      <ContentPreview
        model={model}
        canWatchLesson={canWatchLesson}
        style={{ marginBottom: 16 }}
      />
      <TextElements model={model} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerVertical: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  contentPreview: {
    flex: 1,
    aspectRatio: 156 / 94,
    width: '100%',
    maxWidth: 156,
    height: 'auto',
    marginRight: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginRight: 24,
  },
  image: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 8,
  },
  duration: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: 'white',
    borderRadius: 4,
  },
  completedMarkContainer: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedMark: {
    padding: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  continue: {
    marginTop: 8,
  },
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  lockedContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locked: {
    padding: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  scheduleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  scheduleElement: {
    marginRight: 16,
  },
});
