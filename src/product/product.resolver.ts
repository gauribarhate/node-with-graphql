import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductType } from "./product.type";
import { ProductService } from "./product.service";

@Resolver(() => ProductType)
export class ProductResolver {
    constructor(private productService: ProductService) {

    }
    @Query(() => [ProductType])
    getProducts() {
        return this.productService.getProducts()
    }

    @Mutation(() => ProductType)
    createProduct(
        @Args('title') title: string,
        @Args('description') description: string,
        @Args('price') price: number,
        @Args('tags') tags: string,
        @Args('brand') brand: string,
    ) {
        return this.productService.createProduct(title, description, price, tags, brand)
    }

    @Mutation(() => ProductType)
    updateProduct(
        @Args('id') id: number,
        @Args('description') description: string,
        @Args('price') price: number,
        @Args('tags') tags: string,
    ) {
        return this.productService.updateProduct(id, description, price, tags)
    }


    @Mutation(() => ProductType)
    deleteProduct(
        @Args('id') id: number,
    ) {
        return this.productService.deleteProduct(id)
    }
}