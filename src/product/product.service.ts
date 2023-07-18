import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductInputType, ProductTypeUpdate } from './product.type';
import { UserEntity } from 'src/user/user.entity';
import { Kafka } from 'kafkajs';
import { KafkaService } from 'src/kafka/kafka.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
    private kafkaService: KafkaService,
  ) {}

  async getProducts(user: UserEntity) {
    // return await this.repository.find({ take: 2 });
    const products = await this.repository
      .createQueryBuilder('product')
      .where(`product.userId = :id`, { id: user['id'] })
      .getMany();

    return products;
  }

  async getProductById(id: number, user: UserEntity) {
    // const product = await this.repository.findOneBy({ id });
    const product = await this.repository
      .createQueryBuilder('product')
      .where(`product.userId = :userId and product.id= :id`, {
        id,
        userId: user['id'],
      })
      .getOne();

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(productData: ProductInputType, user: UserEntity) {
    productData['user'] = user;
    await this.repository.save(productData);

    const productId = productData['id'];
    this.kafkaService.produceMessage(productData, user, productId);
    return productData;
  }

  async updateProduct(productData: ProductTypeUpdate, user: UserEntity) {
    const product = await this.getProductById(productData.id, user);
    await this.repository.save(productData);

    return product;
  }

  async deleteProduct(id: number, user: UserEntity) {
    const product = await this.getProductById(id, user);
    await this.repository.remove(product);
    return product;
  }
}
