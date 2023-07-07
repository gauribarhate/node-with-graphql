import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class ProductType {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    descrioption: string;

    @Field()
    price: string;

    @Field()
    tags: string;

    @Field()
    brand: string;
}