import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputType, UserType } from './user.type';
import { UserService } from './user.service';
import { SigninResponseType } from './signin.response.type';
import { AuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetUSer } from './user.decorator';
import { UserEntity } from './user.entity';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}
  @Mutation(() => UserType)
  signup(@Args('userData') userData: UserInputType) {
    return this.userService.signup(userData);
  }

  @Query(() => SigninResponseType)
  signin(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.signin(email, password);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserType)
  getprofile(@GetUSer() user: UserEntity) {
    return this.userService.getprofile(user['id']);
  }
}
