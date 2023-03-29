import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './Admin';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find({ relations: ['users', 'employees'] });
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOne(id, { relations: ['users', 'employees'] });
  }

  async create(admin: Admin): Promise<Admin> {
    return this.adminRepository.save(admin);
  }

  async update(id: number, admin: Admin): Promise<Admin> {
    await this.adminRepository.update(id, admin);
    return this.adminRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}

