import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>) { }

    async getProducts() {
        return await this.repository.find();
    }

    async getProductById(id: number) {
        const product = await this.repository.findOneBy({ id });
        return product;
    }

    async createProduct(title: string, descrioption: string, price: number, tags: string, brand: string) {
        const product = new ProductEntity();
        product.title = title
        product.descrioption = descrioption
        product.price = price
        product.tags = tags
        product.brand = brand

        await this.repository.save(product);
        return product;
    }

    async updateProduct(id: number, descrioption: string, price: number, tags: string) {
        const product = await this.getProductById(id);
        product.descrioption = descrioption
        product.price = price
        product.tags = tags

        await this.repository.save(product);
        return product;
    }

    async deleteProduct(id: number) {
        const product = await this.getProductById(id);
        await this.repository.remove(product);
        return product;
    }
}
