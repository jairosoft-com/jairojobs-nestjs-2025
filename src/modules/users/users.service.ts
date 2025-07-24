import { Injectable, ConflictException } from '@nestjs/common';
import { IUserRepository } from './repositories/user.repository.interface';
import { User } from './entities/user.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(userData: DeepPartial<User>): Promise<User> {
    if (!userData.email) {
      throw new ConflictException('Email is required');
    }
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    return await this.userRepository.create(userData);
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async update(id: string, userData: DeepPartial<User>): Promise<User | null> {
    return await this.userRepository.update(id, userData);
  }

  async delete(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
