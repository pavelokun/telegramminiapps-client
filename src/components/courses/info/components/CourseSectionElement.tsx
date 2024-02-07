import React, { useCallback, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CourseLessonElement } from './CourseLessonElement';
import { Text, Icon, Heading } from 'native-base';
import { isNothing } from '@/src/utils/Common.utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LessonModel } from '@/src/api/lesson';
import { observer } from 'mobx-react-lite';
import { CourseSectionModel } from '@/src/api/course/CourseSectionModel';
import { AppFillColumn } from '@/src/components/core/AppFillColumn';

type HeaderProps = {
  model: CourseSectionModel;
  onPress: () => void;
  expanded?: boolean;
};

const Header = observer<HeaderProps>(({ model, expanded, onPress }) => {
  return (
    <TouchableOpacity style={[styles.titleWrapper]} onPress={onPress}>
      <View style={[styles.titleContainer]}>
        <Text
          color={'purple.800'}
          fontSize={'md'}
          fontWeight={'semibold'}
          mb={2}
        >
          Модуль {model.order + 1}
        </Text>
        <Heading>{model.title ?? ''}</Heading>
      </View>
      {model.isCompleted && (
        <View style={styles.completeContainer}>
          <Icon
            as={MaterialCommunityIcons}
            name={'check'}
            size={6}
            color={'green.500'}
          />
        </View>
      )}
      <Icon
        as={MaterialCommunityIcons}
        name={'chevron-left'}
        size={8}
        style={{
          transform: [{ rotate: expanded ? '90deg' : '270deg' }],
          marginLeft: 16,
        }}
      />
    </TouchableOpacity>
  );
});

type FooterProps = {
  model: CourseSectionModel;
};

const Footer = observer<FooterProps>(({ model }) => {
  if (isNothing(model.description)) {
    return <></>;
  }
  return (
    <View style={styles.footerContainer}>
      <Heading size={'md'} style={[{ marginBottom: 8 }]}>
        Что ты узнаешь
      </Heading>
      <Text>{model.description}</Text>
    </View>
  );
});

export type CourseSectionElementProps = {
  model: CourseSectionModel;
  useDesktop?: boolean;
  initialExpanded?: boolean;
  onLessonLayout?: (lesson: any, event: LayoutChangeEvent) => void;
};

export const CourseSectionElement = observer<CourseSectionElementProps>(
  (props) => {
    const {
      model,
      useDesktop = true,
      initialExpanded = false,
      onLessonLayout,
    } = props;
    const [expanded, setExpanded] = useState(initialExpanded);
    const renderLesson = useCallback(({ item }: { item: LessonModel }) => {
      return (
        <CourseLessonElement
          key={item.id}
          model={item}
          onLayout={(e: any) => {
            onLessonLayout?.(item, e);
          }}
        />
      );
    }, []);

    return (
      <View
        style={[
          styles.wrapper,
          {
            padding: useDesktop ? 40 : 24,
          },
        ]}
      >
        <Header
          model={model}
          expanded={expanded}
          onPress={() => {
            setExpanded((prevState) => !prevState);
          }}
        />
        {expanded && (
          <View style={[styles.childrenContainer]}>
            <AppFillColumn<LessonModel>
              data={model.lessons}
              renderItem={renderLesson}
              spacing={32}
            />
            <Footer model={model} />
          </View>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  childrenContainer: {
    marginTop: 24,
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
  },
  completeContainer: {
    width: 24,
    height: 24,
    borderRadius: 16,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
