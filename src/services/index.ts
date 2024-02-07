import { UserStoreService } from '@artsiombarouski/rn-user-store-service';
import {
  ServiceContainer,
  withServicePersist,
} from '@artsiombarouski/rn-services';
import { defaultResourceApiConfig } from '@artsiombarouski/rn-resources';
import { BotService } from '@/src/services/BotService';
import { CourseProgressResource, CourseResource } from '@/src/api/course';
import { UserSyncService } from '@/src/services/UserSyncService';
import { API_URL } from '@/src/constants/Env';
import { UserPayload } from '@/src/api';
import { AppApiTransformer } from '@/src/api/AppApiTransformer';
import { LessonResource } from '@/src/api/lesson';
import { ProductResource } from '@/src/api/products';

// @ts-ignore
defaultResourceApiConfig.transformer = new AppApiTransformer();

export const rootServiceContainer = () =>
  new ServiceContainer({
    services: [
      withServicePersist(
        'user-state',
        new UserStoreService<UserPayload>({
          callbacks: {
            onCurrentUserChanged: (user) => {
              defaultResourceApiConfig.transport.interceptors.request.clear();
              defaultResourceApiConfig.transport.defaults.baseURL = API_URL;
              if (user) {
                defaultResourceApiConfig.transport.interceptors.request.use(
                  (request) => {
                    request.headers[
                      'Authorization'
                    ] = `Bearer ${user?.authToken}`;
                    return request;
                  },
                );
              }
            },
          },
        }),
      ),
    ],
  });

export const scopedServiceContainer = () =>
  new ServiceContainer({
    services: [
      UserSyncService,
      LessonResource,
      CourseResource,
      CourseProgressResource,
      ProductResource,
      BotService,
    ],
  });
