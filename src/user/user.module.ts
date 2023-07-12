import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: '12218',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [UserService, UserResolver, AuthGuard],
})
export class UserModule {}
