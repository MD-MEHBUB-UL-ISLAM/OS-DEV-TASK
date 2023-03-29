import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Admin } from './Admin';


import { AdminService } from './AdminService';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  async create(@Body() admin: Admin): Promise<Admin> {
    return this.adminService.create(admin);
  }

}
