import { EventTypeEnum } from 'src/modules/account/enums/event-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('account_records')
export class AccountRecordEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'amount', type: 'varchar', nullable: false })
  amount: number;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: false,
    enum: EventTypeEnum,
  })
  type: EventTypeEnum;

  @ManyToOne(() => AccountEntity, (account) => account.originRecords, {
    nullable: true,
  })
  @JoinColumn({
    name: 'origin_id',
  })
  originAccount: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.destinationRecords, {
    nullable: true,
  })
  @JoinColumn({
    name: 'destination_id',
  })
  destinationAccount: AccountEntity;
}
