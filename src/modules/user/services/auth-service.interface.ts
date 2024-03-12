import { AccessTokenDTO } from '../dtos/access-token.dto';
import { JWTDataDTO } from '../dtos/jwt-data.dto';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');

export interface IAuthService {
  createToken: (data: JWTDataDTO) => Promise<AccessTokenDTO>;
}
