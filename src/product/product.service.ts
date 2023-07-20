import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import {
  ProductInputType,
  ProductType,
  ProductTypeUpdate,
} from './product.type';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async getProducts() {
    return await this.repository.find({ take: 2 });
  }

  async getProductById(id: number) {
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(productData: ProductInputType): Promise<ProductType> {
    return await this.repository.save(productData);
  }

  async updateProduct(productData: ProductTypeUpdate) {
    const product = await this.getProductById(productData.id);
    await this.repository.save(productData);

    return product;
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    await this.repository.remove(product);
    return product;
  }
}
