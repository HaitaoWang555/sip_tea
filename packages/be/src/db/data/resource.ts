import { Resource } from '@/system/resource/type';

export const resource = [
  {
    title: '菜单',
    url: '/menu/**',
  },
  {
    title: '菜单查询方法',
    url: 'GET:/menu/**',
  },
  {
    title: '资源',
    url: '/resource/**',
  },
  {
    title: '资源查询方法',
    url: 'GET:/resource/**',
  },
  {
    title: '用户',
    url: '/user/**',
  },
  {
    title: '用户查询方法',
    url: 'GET:/user/**',
  },
  {
    title: '角色',
    url: '/role/**',
  },
  {
    title: '角色查询方法',
    url: 'GET:/role/**',
  },
  {
    title: '部门',
    url: '/department/**',
  },
  {
    title: '部门查询方法',
    url: 'GET:/department/**',
  },
  {
    title: '职位',
    url: '/position/**',
  },
  {
    title: '职位查询方法',
    url: 'GET:/position/**',
  },
  {
    title: '代码生成',
    url: '/gen-table/**',
  },
  {
    title: '代码生成查询方法',
    url: 'GET:/gen-table/**',
  },
  {
    title: '缓存',
    url: '/cache/**',
  },
  {
    title: '缓存查询方法',
    url: 'GET:/cache/**',
  },
  {
    title: '诗词',
    url: '/poetry/**',
  },
  {
    title: '诗词查询方法',
    url: 'GET:/poetry/**',
  },
  {
    title: '操作日志',
    url: '/operateLog/**',
  },
  {
    title: '操作日志查询方法',
    url: 'GET:/operateLog/**',
  },
] as Resource[];
