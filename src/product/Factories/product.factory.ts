import { Factory } from 'fishery';
import { ProductType } from '../product.type';
import { faker } from '@faker-js/faker';

const productFactory = Factory.define<ProductType>(({ sequence }) => ({
  id: sequence,
  title: faker.string.alpha(),
  description: faker.string.alpha(),
  tag: faker.string.alpha(),
  price: 124,
  brand: faker.string.alpha(),
}));

export default productFactory;
