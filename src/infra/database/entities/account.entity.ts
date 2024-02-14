import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', nullable: false, unique: true })
  id: string;

  @Column({ name: 'balance', type: 'float', nullable: false })
  balance: number;
}
