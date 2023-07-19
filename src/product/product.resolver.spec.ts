import { Test, TestingModule } from '@nestjs/testing';
import {
  ProductInputType,
  ProductType,
  ProductTypeUpdate,
} from './product.type';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

const mockProduct: ProductType = {
  id: 1,
  title: 'Mock Product',
  description: 'Mock Product',
  price: '124',
  tag: 'Mock Product',
  brand: 'Mock Product',
};

const prodInput: ProductInputType = {
  title: 'Mock Product',
  description: 'Mock Product',
  price: 124,
  tag: 'Mock Product',
  brand: 'Mock Product',
};

const prodUpdate: ProductTypeUpdate = {
  id: 1,
  description: 'Mock Product',
  price: 124,
  tag: 'Mock Product',
};

const productServiceMock = {
  createProduct: jest.fn(
    (prodInput: ProductInputType): ProductType => mockProduct,
  ),

  updateProduct: jest.fn(
    (prodUpdate: ProductTypeUpdate): ProductType => mockProduct,
  ),

  deleteProduct: jest.fn((id: number): ProductType => mockProduct),

  getProducts: jest.fn((): ProductType[] => [mockProduct]),
};

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create product', () => {
    const result = resolver.createProduct(prodInput);
    expect(result['id']).toEqual(1);
  });

  it('should update product', () => {
    const result = resolver.updateProduct(prodUpdate);
    expect(result['description']).toEqual('Mock Product');
  });

  it('should delete given product', () => {
    const result = resolver.deleteProduct(1);
    expect(result['description']).toEqual('Mock Product');
  });

  it('should get products', () => {
    const result = resolver.getProducts();
    expect(result).toEqual([mockProduct]);
  });
});
