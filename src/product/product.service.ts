import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductInputType, ProductTypeUpdate } from './product.type';
import { UserEntity } from 'src/user/user.entity';
import { Kafka } from 'kafkajs';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
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

    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:29092'],
    });

    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
      topic: 'product-topic',
      messages: [{ value: JSON.stringify(productData) }],
    });
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
