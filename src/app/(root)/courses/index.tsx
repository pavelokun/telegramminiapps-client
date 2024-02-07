import React from 'react';
import { Box, Text, FlatList, Center } from 'native-base';
import { CourseCard } from '@/src/components';
import { observer } from 'mobx-react-lite';
import { useService } from '@artsiombarouski/rn-services';
import { CourseModel, CourseResource } from '@/src/api/course';
import { useResourceList } from '@artsiombarouski/rn-resources';

const CoursesPage = observer(() => {
  const courseResource = useService(CourseResource);
  const list = useResourceList<CourseModel>(courseResource, {
    permanentQuery: {
      sort: ['sections.order:ASC', 'sections.lessons.order:ASC'],
    },
  }); //TODO: don't download sections and lessons here

  if (list.isLoadingOrInitialLoading) {
    return (
      <Center flex={1}>
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <FlatList
      data={list.data.slice()}
      style={{
        flex: 1,
        padding: 16,
      }}
      ItemSeparatorComponent={() => <Box h={4} />}
      renderItem={({ item }) => <CourseCard model={item} />}
    />
  );
});

export default CoursesPage;
