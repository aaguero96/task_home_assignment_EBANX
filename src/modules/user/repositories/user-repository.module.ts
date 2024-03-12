import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { useClass } from '../../../shared/helpers/use-class.helper';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { UserRepository } from './user.repository';
import { USER_REPOSITORY } from './user-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [useClass(USER_REPOSITORY, UserRepository)],
  exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {}
