import {
  BaseService,
  OnServicesReady,
  service,
} from '@artsiombarouski/rn-services';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { ResourceApi, ResourceApiError } from '@artsiombarouski/rn-resources';
import { API_URL } from '@/src/constants/Env';

@service()
export class BotService extends BaseService implements OnServicesReady {
  @observable
  isLoading: boolean = false;

  @observable
  error?: ResourceApiError | undefined;

  private api = ResourceApi.create(`${API_URL}/bot`);

  constructor() {
    super();
    makeObservable(this);
  }

  async onServicesReady() {
    // Initialize services or states if needed
  }

  @action.bound
  async generateInvoiceLink(
    cart: { productId: string; quantity: number; productType: string }[],
    userId: string,
  ) {
    runInAction(() => {
      this.isLoading = true;
      this.error = undefined;
    });

    const response = await this.api.postRest('/invoiceLink', {
      cart,
      userId,
    });

    if (response.error) {
      runInAction(() => {
        this.isLoading = false;
        this.error = response.error;
      });
    } else {
      runInAction(() => {
        this.isLoading = false;
      });
    }
    return response;
  }
}
