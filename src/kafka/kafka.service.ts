import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { ProductInputType } from 'src/product/product.type';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class KafkaService {
  async produceMessage(
    productData: ProductInputType,
    user: UserEntity,
    productId: string,
  ) {
    const kafka = new Kafka({
      brokers: ['localhost:29092'],
    });

    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
      topic: 'product-topic',
      messages: [
        { value: JSON.stringify(productData), key: productId.toString() },
      ],
    });
  }
}
