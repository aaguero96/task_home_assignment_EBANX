export const ACCOUNT_PRODUCER = Symbol('ACCOUNT_PRODUCER');

export interface IAccountProducer {
  deposit: (destination: string, amount: number) => Promise<void>;
  withdraw: (origin: string, amount: number) => Promise<void>;
  transfer: (
    origin: string,
    amount: number,
    destination: string,
  ) => Promise<void>;
}
