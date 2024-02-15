import { Inject, Injectable } from '@nestjs/common';
import { ISystemService } from './system-service.interface';
import {
  ACCOUNT_REPOSITORY,
  IAccountRepository,
} from '../../account/repositories/account-repository.interface';

@Injectable()
export class SystemService implements ISystemService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepo: IAccountRepository,
  ) {}

  reset = async (): Promise<void> => {
    await this._accountRepo.reset();
  };
}
