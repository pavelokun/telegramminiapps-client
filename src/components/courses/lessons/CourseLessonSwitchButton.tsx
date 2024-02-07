import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ArrowUpIcon, Text } from 'native-base';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LessonDto } from '@/src/api/lesson';

type CourseLessonSwitchButtonProps = {
  model: LessonDto;
  switchToNext?: boolean;
  showTitle?: boolean;
  style?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
};

export const CourseLessonSwitchButton = observer<CourseLessonSwitchButtonProps>(
  (props) => {
    const { model, switchToNext, showTitle, style, iconContainerStyle } = props;
    const router = useRouter();
    const { id } = useLocalSearchParams<{
      id: string;
    }>();

    if (
      (switchToNext && !model.nextLesson) ||
      (!switchToNext && !model.prevLesson)
    ) {
      return <></>;
    }

    function onNextLessonClick(model: any) {
      if (!model.nextLesson) {
        return;
      }
      router.replace(`/courses/${id}/lesson/${model.nextLesson.id}`);
    }

    function onPrevLessonClick(model: any) {
      if (!model.prevLesson) {
        return;
      }
      router.replace(`/courses/${id}/lesson/${model.prevLesson.id}`);
    }

    return (
      <TouchableOpacity
        style={[
          styles.container,
          switchToNext && { flexDirection: 'row-reverse' },
          style,
        ]}
        onPress={() =>
          switchToNext ? onNextLessonClick(model) : onPrevLessonClick(model)
        }
      >
        <View style={[styles.iconContainer, iconContainerStyle]}>
          <ArrowUpIcon
            size={4}
            style={{
              transform: [{ rotate: switchToNext ? '90deg' : '270deg' }],
            }}
          />
        </View>
        {showTitle && (
          <Text style={styles.title} fontSize={16} fontWeight={'bold'}>
            {switchToNext ? 'Вперед' : 'Назад'}
          </Text>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginHorizontal: 16,
  },
});
