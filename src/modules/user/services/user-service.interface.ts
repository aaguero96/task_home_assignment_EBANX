import { UserEntity } from 'src/infra/database/entities/user.entity';
import { EntityManager } from 'typeorm';
import { AccessTokenDTO } from '../dtos/access-token.dto';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  create: (
    user: UserEntity,
    manager?: EntityManager,
  ) => Promise<AccessTokenDTO>;

  login: (username: string, password: string) => Promise<AccessTokenDTO>;
}
