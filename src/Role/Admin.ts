import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { Employee } from './UserEntity';
import { User } from './UserEntity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Employee)
  @JoinTable()
  employees: Employee[];
}
