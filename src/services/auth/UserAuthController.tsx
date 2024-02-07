import { action, makeObservable } from 'mobx';
import { ResourceApi } from '@artsiombarouski/rn-resources';
import { SingleActionController } from '@/src/services/utils';
import { UserDto } from '@/src/api/users/types';

export type UserLoginRequestDto = { initData: string };

export type UserAuthResultDto = {
  authToken: string;
  user: UserDto;
};

export class UserAuthController extends SingleActionController<UserAuthResultDto> {
  private readonly api = new ResourceApi<UserAuthResultDto>('/users/auth');

  constructor() {
    super();
    makeObservable(this);
  }

  @action.bound
  async login(values: UserLoginRequestDto) {
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;
    try {
      const result = await this.api.postRest('/login', values);
      if (result.error) {
        this.error = result.error;
      } else {
        this.result = result.data as any;
      }
      return result;
    } finally {
      this.isSubmitting = false;
    }
  }
}
