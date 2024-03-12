import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserUnauthorizedException } from '../../modules/user/exceptions/unnauthorize.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  private _extractToken(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this._extractToken(request);

    if (!token) {
      throw new UserUnauthorizedException();
    }

    try {
      const data = await this._jwtService.verifyAsync(token, {
        secret: this._configService.get('JWT_SECRET'),
      });
      request['user'] = data;
      return true;
    } catch (e) {
      throw new UserUnauthorizedException();
    }
  }
}
