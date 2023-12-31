import { Menu } from '@/system/menu/type';

export const menu: Menu[] = [
  {
    id: 1,
    title: '系统管理',
    parentId: 0,
    code: 1,
    url: '/system',
  },
  {
    id: 2,
    title: '菜单',
    parentId: 1,
    code: 1,
    url: '/system/menu',
  },
  {
    id: 3,
    title: '用户',
    parentId: 1,
    code: 1,
    url: '/system/user',
  },
  {
    id: 17,
    title: '重置密码',
    parentId: 3,
    code: 1,
    type: 2,
    url: '/system/user/updatePassword',
  },
  {
    id: 4,
    title: '角色',
    parentId: 1,
    code: 1,
    url: '/system/role',
  },
  {
    id: 5,
    title: '部门',
    parentId: 1,
    code: 1,
    url: '/system/department',
  },
  {
    id: 6,
    title: '职位',
    parentId: 1,
    code: 1,
    url: '/system/position',
  },
  {
    id: 7,
    title: '系统工具',
    parentId: 0,
    code: 1,
    url: '/tool',
  },
  {
    id: 8,
    title: '代码生成',
    parentId: 7,
    code: 1,
    url: '/tool/gen',
  },
  {
    id: 9,
    title: '资源',
    parentId: 1,
    code: 1,
    url: '/system/resource',
  },
  {
    id: 10,
    title: '系统监控',
    parentId: 0,
    code: 1,
    url: '/monitor',
  },
  {
    id: 11,
    title: '缓存管理',
    parentId: 10,
    code: 1,
    url: '/monitor/cache',
  },
  {
    id: 12,
    title: '内容管理',
    parentId: 0,
    code: 1,
    url: '/cms',
  },
  {
    id: 13,
    title: '诗词',
    parentId: 12,
    code: 1,
    url: '/cms/poetry',
  },
  {
    id: 14,
    title: '个人页',
    parentId: 0,
    code: 1,
    url: '/account',
  },
  {
    id: 15,
    title: '个人设置',
    parentId: 14,
    code: 1,
    url: '/account/settings',
  },
  {
    id: 16,
    title: '操作日志',
    parentId: 10,
    code: 1,
    url: '/monitor/operateLog',
  },
];
