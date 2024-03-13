export class AccountSummaryDTO {
  created?: boolean;
  deposits?: { amount: number }[];
  withdrawals?: { amount: number }[];
  transfers?: { toAccount: string; amount: number; fromAccount: string }[];
}
