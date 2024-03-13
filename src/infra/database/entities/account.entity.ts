import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AccountRecordEntity } from './account-records.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', nullable: false, unique: true })
  id: string;

  @Column({ name: 'balance', type: 'float', nullable: false })
  balance: number;

  @OneToMany(() => AccountRecordEntity, (record) => record.originAccount)
  originRecords: AccountRecordEntity[];

  @OneToMany(() => AccountRecordEntity, (record) => record.destinationAccount)
  destinationRecords: AccountRecordEntity[];
}
