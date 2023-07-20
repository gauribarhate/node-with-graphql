import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ProductInputType,
  ProductType,
  ProductTypeUpdate,
} from './product.type';
import { ProductService } from './product.service';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private productService: ProductService) {}
  @Query(() => [ProductType])
  getProducts() {
    return this.productService.getProducts();
  }

  @Mutation(() => ProductType)
  async createProduct(
    @Args('productData') productData: ProductInputType,
  ): Promise<ProductType> {
    return await this.productService.createProduct(productData);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('productData') productData: ProductTypeUpdate,
  ): Promise<ProductType> {
    return this.productService.updateProduct(productData);
  }

  @Mutation(() => ProductType)
  deleteProduct(@Args('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
