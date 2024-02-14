export class TransferResponseDTO {
  origin: {
    id: string;
    balance: number;
  };
  destination: {
    id: string;
    balance: number;
  };
}
