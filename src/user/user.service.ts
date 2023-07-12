import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Crypto from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './user.entity';
import { UserInputType } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(userData: UserInputType) {
    (userData.password = String(Crypto.SHA256(userData.password))),
      await this.userRepository.save(userData);
    return userData;
  }

  async signin(email: string, password: string) {
    const user = await this.userRepository.findOneBy({
      email,
      password: String(Crypto.SHA256(password)),
    });

    if (!user) {
      throw new NotFoundException();
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async getprofile(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }
}
