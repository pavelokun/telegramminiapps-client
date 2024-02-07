import { Resource, ResourceApi } from '@artsiombarouski/rn-resources';
import { service } from '@artsiombarouski/rn-services';
import { ProductModel } from '@/src/api/products/ProductModel';

@service()
export class ProductResource extends Resource<ProductModel> {
  constructor() {
    super(() => ProductModel, ResourceApi.create('/products'));
  }
}
