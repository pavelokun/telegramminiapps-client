import {
  BaseService,
  OnServicesReady,
  service,
} from '@artsiombarouski/rn-services';
import { UserStoreService } from '@artsiombarouski/rn-user-store-service';
import { ResourceApi, ResourceApiError } from '@artsiombarouski/rn-resources';
import { action, makeObservable, observable } from 'mobx';
import { API_URL } from '@/src/constants/Env';
import { UserPayload } from '@/src/api';

@service()
export class UserSyncService extends BaseService implements OnServicesReady {
  @observable
  isUpdating: boolean = false;

  @observable
  isSaving: boolean = false;

  @observable
  error?: ResourceApiError | undefined;

  private api = ResourceApi.create(`${API_URL}/users/me`);

  constructor() {
    super();
    makeObservable(this);
  }

  async onServicesReady() {
    const userService = this.getService(UserStoreService<UserPayload>);
    const currentUser = userService.currentUser;
    if (currentUser) {
      this.syncUser().then(() => {
        //ignore
      });
      // await UserSyncService.identifyUser(currentUser);
    }
  }

  // static async identifyUser(payload: UserPayload) {
  //   let parseNameResult: any;
  //   if (payload.user.name) {
  //     try {
  //       parseNameResult = parseName(payload.user.name);
  //     } catch (ignore) {}
  //   }
  //   const { firstName, lastName } = parseNameResult ?? {};
  //   await UserIdentifier.identifyUser(payload.user.id, payload.user.email);
  //   await UserIdentifier.setUserProperties({
  //     name: payload.user.name,
  //     internal_user_id: payload.user.id,
  //     first_name: firstName,
  //     last_name: lastName,
  //     type: payload.type,
  //     phone: payload.phone,
  //   });
  // }

  @action.bound
  async syncUser() {
    this.isUpdating = true;
    this.error = undefined;
    const response = await this.api.getRest<any>('');
    if (response.data) {
      this.getService(UserStoreService<UserPayload>).updateUser({
        key: response.data!.id,
        user: response.data as any,
      });
    }
    this.isUpdating = false;
    this.error = response.error;
  }

  @action.bound
  async updateUser(payload: any) {
    const currentUser = this.getService(UserStoreService<UserPayload>)
      .currentUser!;
    this.isSaving = true;
    this.error = undefined;
    const response = await this.api.patchRest<any>('', payload);
    if (response.data) {
      await this.getService(UserStoreService<UserPayload>).updateUser({
        ...currentUser,
        user: response.data!,
      });
    }
    this.isSaving = false;
    this.error = response.error;
    return response;
  }
}
