import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';
import { BaseAbstractRepository } from '../../../common/abstracts/base.abstract.repository';

@Injectable()
export class TypeOrmUserRepository
  extends BaseAbstractRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    protected readonly entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }
}
