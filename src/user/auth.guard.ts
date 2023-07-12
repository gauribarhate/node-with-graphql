import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request: Request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);

    const newContext = GqlExecutionContext.create(context);
    const request = newContext.getContext().req;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: '12218',
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token is not valid');
    }
    return true;
  }
}
