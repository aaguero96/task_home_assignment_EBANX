import { EntityManager } from 'typeorm';
import { DepositResponseDTO } from '../dtos/deposit-reponse.dto';
import { TransferResponseDTO } from '../dtos/transfer-response.dto';
import { WithdrawResponseDTO } from '../dtos/withdraw-response.dto';

export const ACCOUNT_SERVICE = Symbol('ACCOUNT_SERVICE');

export interface IAccountService {
  deposit: (
    destination: string,
    amount: number,
    manager?: EntityManager,
  ) => Promise<DepositResponseDTO>;
  withdraw: (origin: string, amount: number) => Promise<WithdrawResponseDTO>;
  transfer: (
    origin: string,
    amount: number,
    destination: string,
    manager?: EntityManager,
  ) => Promise<TransferResponseDTO>;
  getBalanceById: (accountId: string) => Promise<number>;
}
