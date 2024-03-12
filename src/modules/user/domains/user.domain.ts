import { UserEntity } from 'src/infra/database/entities/user.entity';
import { IUserDomain } from './user-domain.interface';
import { encriptPassword } from 'src/shared/helpers/encript-password.helper';
import { AccountEntity } from 'src/infra/database/entities/account.entity';

export class UserDomain implements IUserDomain {
  constructor() {}

  create = (user: UserEntity, account: AccountEntity): void => {
    const hashPassword = encriptPassword(user.password);
    user.password = hashPassword;
    user.account = account;
  };
}
