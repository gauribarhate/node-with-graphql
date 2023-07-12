import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ProductInputType,
  ProductType,
  ProductTypeUpdate,
} from './product.type';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/user/auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { GetUSer } from 'src/user/user.decorator';

@UseGuards(AuthGuard)
@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private productService: ProductService) {}
  @Query(() => [ProductType])
  getProducts(@GetUSer('user') user: UserEntity) {
    return this.productService.getProducts(user);
  }

  @Mutation(() => ProductType)
  createProduct(
    @Args('productData') productData: ProductInputType,
    @GetUSer('user') user: UserEntity,
  ) {
    return this.productService.createProduct(productData, user);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('productData') productData: ProductTypeUpdate,
    @GetUSer('user') user: UserEntity,
  ) {
    return this.productService.updateProduct(productData, user);
  }

  @Mutation(() => ProductType)
  deleteProduct(@Args('id') id: number, @GetUSer('user') user: UserEntity) {
    return this.productService.deleteProduct(id, user);
  }
}
