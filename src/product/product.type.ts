import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/user.entity';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: string;

  @Field()
  tag: string;

  @Field()
  brand: string;
}

@InputType()
export class ProductInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  tag: string;

  @Field()
  brand: string;

  // @Field({ nullable: true })
  // user: UserEntity;
}

@InputType()
export class ProductTypeUpdate {
  @Field({ nullable: true })
  id: number;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  tag: string;
}
