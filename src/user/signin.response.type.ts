import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SigninResponseType {
  @Field()
  token: string;
}
