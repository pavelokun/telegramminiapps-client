import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Card, Heading, Pressable } from 'native-base';
import { useRouter } from 'expo-router';
import { useUsers } from '@/src/services/hooks/useUsers';
import { observer } from 'mobx-react-lite';
import { useService } from '@artsiombarouski/rn-services';
import { BotService } from '@/src/services/BotService';
import { CourseModel } from '@/src/api/course';
import { CourseCardProgress } from '@/src/components';
import { useTelegram } from '@/src/services/hooks';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { API_URL } from '@/src/constants/Env';

type CourseCardProps = {
  model: CourseModel;
  style?: StyleProp<ViewStyle>;
};

export const CourseCard = observer<CourseCardProps>((props) => {
  const { model, style } = props || {};
  const router = useRouter();
  const user = useUserInfo();
  const users = useUsers();
  const { tg } = useTelegram();
  const botService = useService(BotService);

  //TODO:
  // 1.add logic to show landing if !canWatchCourse (const canWatchCourse = user?.limiter?.canWatchCourse(model))
  // 2.move logic to controller
  const getInvoiceLink = async () => {
    const cartItems = [
      {
        productId: model.id,
        quantity: 1,
        productType: 'course',
      },
    ];

    await botService
      .generateInvoiceLink(cartItems, user?.id!)
      .then((response) => {
        if (response.error) {
          console.log('error: ', response.error);
          return;
        }

        const { invoiceLink } = response.data;
        if (invoiceLink) {
          tg.showPopup(
            {
              title: "You don't have access to the course",
              message: 'Do you want to buy it?',
              buttons: [
                {
                  id: '1',
                  type: 'ok',
                },
                {
                  id: '2',
                  type: 'cancel',
                },
              ],
            },
            (buttonId) => {
              if (buttonId === '1') {
                tg.openInvoice(invoiceLink, async (status) => {
                  if (status === 'paid') {
                    //todo: update user using UserUpdater
                    const response = await fetch(
                      `${API_URL}/users?join=purchases`,
                    );
                    if (!response.ok) {
                      console.error('Error in get user:', response.statusText);
                      return false;
                    }
                    const data = await response.json();
                    const updatedUser = data.find(
                      ({ id }: { id: string }) => id === user?.id,
                    );
                    await users.updateUser({
                      key: users.currentUser?.key,
                      user: updatedUser,
                    } as any);

                    setTimeout(() => {
                      return router.push(`/courses/${model.id}`);
                    }, 1000);
                  }
                });
              }
            },
          );
        }
      });
  };

  const onCourseClick = () => {
    const isPremiumAvailable = false; //todo: remove after adding logic (user.purchases && hasAccess(user?.purchases, model.id))

    if (isPremiumAvailable) {
      getInvoiceLink();
    } else {
      router.push(`/courses/${model.id}`);
    }
  };

  return (
    <Pressable onPress={onCourseClick}>
      <Card style={[styles.wrapper, style]}>
        <ImageBackground
          style={[styles.containerWrapper]}
          source={{ uri: model.assets?.cover }} //todo: make getImageSource function
        >
          <Heading color={'white'} textAlign={'center'}>
            {model.title?.toUpperCase()}
          </Heading>
          <CourseCardProgress model={model} mt={4} />
        </ImageBackground>
      </Card>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    aspectRatio: 500 / 300,
    padding: 0,
  },
  containerWrapper: {
    width: '100%',
    height: '100%',
    padding: 16,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 24,
  },
});
