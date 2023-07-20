import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: number;

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
