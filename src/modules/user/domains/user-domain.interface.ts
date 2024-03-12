import { AccountEntity } from 'src/infra/database/entities/account.entity';
import { UserEntity } from 'src/infra/database/entities/user.entity';

export const USER_DOMAIN = Symbol('USER_DOMAIN');

export interface IUserDomain {
  create: (user: UserEntity, account: AccountEntity) => void;
}
