import { User } from '../entities/user.entity';
import { DeepPartial } from 'typeorm';

export abstract class IUserRepository {
  abstract create(data: DeepPartial<User>): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract update(id: string, data: DeepPartial<User>): Promise<User | null>;
  abstract delete(id: string): Promise<boolean>;
}
