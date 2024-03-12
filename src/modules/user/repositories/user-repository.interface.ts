import { UserEntity } from 'src/infra/database/entities/user.entity';
import { DeepPartial, EntityManager } from 'typeorm';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  create: (
    user: DeepPartial<UserEntity>,
    manager?: EntityManager,
  ) => Promise<UserEntity>;
  findByUsername: (username: string) => Promise<UserEntity>;
}
