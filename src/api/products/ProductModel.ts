import { model, ResourceModel } from '@artsiombarouski/rn-resources';
import { AssetsDto } from '@/src/api/products/types';

@model()
export class ProductModel extends ResourceModel {
  get title() {
    return this.get<string>('title');
  }

  get description() {
    return this.get<string>('description');
  }

  get assets() {
    return this.get<AssetsDto>('assets');
  }

  get basePrice() {
    return this.get<number>('basePrice');
  }
}
