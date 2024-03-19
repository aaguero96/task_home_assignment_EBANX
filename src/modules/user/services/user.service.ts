import { UserEntity } from 'src/infra/database/entities/user.entity';
import { EntityManager } from 'typeorm';
import { IUserService } from './user-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../repositories/user-repository.interface';
import { IUserDomain, USER_DOMAIN } from '../domains/user-domain.interface';
import {
  ACCOUNT_REPOSITORY,
  IAccountRepository,
} from 'src/modules/account/repositories/account-repository.interface';
import { AccessTokenDTO } from '../dtos/access-token.dto';
import { AUTH_SERVICE, IAuthService } from './auth-service.interface';
import { validatePassword } from 'src/shared/helpers/validate-password.helper';
import { UserUnauthorizedException } from '../exceptions/unnauthorize.exception';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly _userRepo: IUserRepository,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepo: IAccountRepository,
    @Inject(USER_DOMAIN) private readonly _userDomain: IUserDomain,
    @Inject(AUTH_SERVICE) private readonly _authService: IAuthService,
  ) {}

  create = async (
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<AccessTokenDTO> => {
    const account = await this._accountRepo.create({ balance: 0 }, manager);
    this._userDomain.create(user, account);
    await this._userRepo.create(user, manager);
    return this._authService.createToken({
      username: user.username,
      id: user.id,
      accountId: user.account.id,
    });
  };

  login = async (
    username: string,
    password: string,
  ): Promise<AccessTokenDTO> => {
    const user = await this._userRepo.findByUsername(username);

    const authorized = user && validatePassword(password, user.password);

    if (!authorized) {
      throw new UserUnauthorizedException();
    }

    return this._authService.createToken({
      username: user.username,
      id: user.id,
      accountId: user.account.id,
    });
  };
}
