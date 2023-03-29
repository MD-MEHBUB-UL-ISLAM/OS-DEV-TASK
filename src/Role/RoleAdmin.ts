import { getConnection } from 'typeorm';
import { Role } from './role';


const adminRole = new Role();
adminRole.name = 'Admin';
adminRole.permissions = {
  employee: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  user: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
};

await getConnection()
  .createQueryBuilder()
  .insert()
  .into(Role)
  .values(adminRole)
  .execute();
