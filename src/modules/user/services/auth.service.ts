import { Injectable } from '@nestjs/common';
import { AccessTokenDTO } from '../dtos/access-token.dto';
import { JWTDataDTO } from '../dtos/jwt-data.dto';
import { IAuthService } from './auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly _jwtService: JwtService) {}

  createToken = async (data: JWTDataDTO): Promise<AccessTokenDTO> => {
    const accessToken = await this._jwtService.signAsync(data);
    return {
      accessToken,
    };
  };
}
