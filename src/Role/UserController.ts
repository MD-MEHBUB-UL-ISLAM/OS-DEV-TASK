import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from './AuthGuard';


@Controller('users')
export class UserController {
  @Get()
  @UseGuards(RolesGuard)
  @Roles({ name: 'Admin' })
  async findAll() {
    // implementation
  }

  // other CRUD methods
}

@Controller('employees')
export class EmployeeController {
  @Get()
  @UseGuards(RolesGuard)
  @Roles({ name: 'Admin' })
  async findAll() {
    // implementation
  }

  // other CRUD methods
}

