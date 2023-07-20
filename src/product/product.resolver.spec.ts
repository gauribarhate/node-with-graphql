import { Test, TestingModule } from '@nestjs/testing';
import {
  ProductInputType,
  ProductType,
  ProductTypeUpdate,
} from './product.type';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { mock } from 'jest-mock-extended';
import productFactory from './Factories/product.factory';

describe('ProductResolver', () => {
  const mockProduct = productFactory.build();
  let resolver: ProductResolver;
  const mockProductService = mock<ProductService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create product', async () => {
    await mockProductService.createProduct.mockResolvedValue(mockProduct);
    const result = await resolver.createProduct({} as ProductInputType);
    expect(result.id).toEqual(1);
  });

  it('should update product', async () => {
    await mockProductService.updateProduct.mockResolvedValue(mockProduct);
    const result = await resolver.updateProduct({} as ProductTypeUpdate);
    expect(result.description).toEqual(mockProduct.description);
  });

  it('should delete given product', async () => {
    await mockProductService.deleteProduct.mockResolvedValue(mockProduct);
    const result = await resolver.deleteProduct(1);
    expect(result.description).toEqual(mockProduct.description);
  });

  it('should get products', async () => {
    await mockProductService.getProducts.mockResolvedValue([mockProduct]);
    const result = await resolver.getProducts();
    expect(result).toEqual([mockProduct]);
  });
});
