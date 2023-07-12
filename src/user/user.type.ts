import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from 'src/product/product.entity';
import { GetUSer } from './user.decorator';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  phone: string;
}

@InputType()
export class UserInputType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  //   @Field({ nullable: true })
  //   products: ProductEntity[];
}
