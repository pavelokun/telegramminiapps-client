import { makeObservable, observable } from 'mobx';
import { ResourceApiError } from '@artsiombarouski/rn-resources';

export class SingleActionController<Result> {
  @observable
  isSubmitting: boolean = false;

  @observable
  result?: Result | undefined;

  @observable
  error?: ResourceApiError | undefined;

  constructor() {
    makeObservable(this);
  }
}
