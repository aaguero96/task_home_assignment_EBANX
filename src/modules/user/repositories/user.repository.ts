import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from './user-repository.interface';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  create = async (
    user: DeepPartial<UserEntity>,
    manager?: EntityManager,
  ): Promise<UserEntity> => {
    const fnExecuter = async (tem: EntityManager) => {
      const entity = tem.create(UserEntity, user);
      return tem.save(UserEntity, entity);
    };

    return manager ? fnExecuter(manager) : fnExecuter(this._userRepo.manager);
  };

  findByUsername = async (username: string): Promise<UserEntity> => {
    return this._userRepo.findOne({ where: { username } });
  };
}
