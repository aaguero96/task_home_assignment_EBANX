import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'balance', type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, unique: true })
  password: string;

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id',
  })
  account: AccountEntity;
}
