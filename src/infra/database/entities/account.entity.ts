import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'balance', type: 'float', nullable: false })
  balance: number;
}
