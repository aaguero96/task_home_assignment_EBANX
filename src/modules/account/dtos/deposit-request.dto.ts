import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class DepositRequestDTO {
  @IsNotEmpty({ message: 'destination is required' })
  @IsString({ message: 'destination should be a string' })
  destination: string;

  @IsNotEmpty({ message: 'amount is required' })
  @IsNumber({}, { message: 'amount should be a number' })
  @IsPositive({ message: 'amount should be positive' })
  amount: number;
}
