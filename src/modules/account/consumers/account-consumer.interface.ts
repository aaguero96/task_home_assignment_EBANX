import { Job } from 'bull';

export const ACCOUNT_CONSUMER = Symbol('ACCOUNT_CONSUMER');

export interface IAccountConsumer {
  deposit: (job: Job<unknown>) => Promise<void>;
}
