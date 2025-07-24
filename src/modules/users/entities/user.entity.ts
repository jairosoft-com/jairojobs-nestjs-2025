import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from '../../../common/database/base.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('simple-array', { default: 'user' })
  roles: string[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
