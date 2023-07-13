import { Department } from '../system/department/entities/department.entity';
import { GenTable } from '../gen_table/entities/gen_table.entity';
import { User } from '../system/user/entities/user.entity';
import { Menu } from '../system/menu/entities/menu.entity';
import { Position } from '../system/position/entities/position.entity';
import { Resource } from '../system/resource/entities/resource.entity';
import { Role } from '../system/role/entities/role.entity';
import dataSource from './data-source';
import { department } from './data/department';
import { gen_table } from './data/gen_table';
import { gen_table_column } from './data/gen_table_column';
import { user } from './data/user';
import { menu } from './data/menu';
import { position } from './data/position';
import { resource } from './data/resource';
import { role } from './data/role';

async function saveGenTable() {
  const repository = dataSource.getRepository(GenTable);
  const count = await repository.count();
  if (count > 0) return;
  gen_table.forEach((g) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    g.columns = gen_table_column.filter((i) => i.tableId === g.id);
  });
  await repository.save(gen_table);
}

async function saveDepartment() {
  const repository = dataSource.getRepository(Department);
  const count = await repository.count();
  if (count > 0) return;
  await repository.save(department);
}

async function savePosition() {
  const repository = dataSource.getRepository(Position);
  const count = await repository.count();
  if (count > 0) return;
  await repository.save(position);
}

async function saveMenu() {
  const repository = dataSource.getRepository(Menu);
  const count = await repository.count();
  if (count > 0) return;
  return await repository.save(menu);
}

async function saveResource() {
  const repository = dataSource.getRepository(Resource);
  const count = await repository.count();
  if (count > 0) return;
  return await repository.save(resource);
}

async function saveRole() {
  const repository = dataSource.getRepository(Role);
  const count = await repository.count();
  if (count > 0) return;
  role.forEach((r) => {
    r.menus = menu;
    r.resources = resource.filter((item, index) => {
      return index % 2 === 0;
    });
  });
  await repository.save(role);
}

async function saveUser() {
  const repository = dataSource.getRepository(User);
  const count = await repository.count();
  if (count > 0) return;
  const adminUser = user.find((i) => i.username === process.env.ADMIN_NAME);
  if (adminUser) {
    adminUser.roles = role;
  }

  await repository.save(user);
}

async function init() {
  await dataSource.initialize();
  await saveDepartment();
  await saveGenTable();
  await savePosition();
  await saveMenu();
  await saveResource();

  await saveRole();
  await saveUser();
  await dataSource.destroy();
}

init();
