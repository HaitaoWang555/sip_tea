import { Department } from '@/system/department/type';

export const department: Department[] = [
  {
    id: 1,
    title: '技术部',
    parentId: 0,
    status: 1,
    code: 'JISHU',
  },
  {
    id: 2,
    title: '财务部',
    parentId: 0,
    status: 1,
    code: 'CAIWU',
  },
  {
    id: 3,
    title: '人力资源部',
    parentId: 0,
    status: 1,
    code: 'RENLI',
  },
  {
    id: 4,
    title: '前端组',
    parentId: 1,
    status: 1,
    code: 'QIANDUAN',
  },
  {
    id: 5,
    title: '后端组',
    parentId: 1,
    status: 1,
    code: 'HOUDUAN',
  },
  {
    id: 6,
    title: 'JAVA',
    parentId: 5,
    status: 1,
    code: 'JAVA',
  },
  {
    id: 7,
    title: 'NODE',
    parentId: 5,
    status: 1,
    code: 'NODE',
  },
  {
    id: 8,
    title: '运营部',
    parentId: 0,
    status: 0,
    code: 'YUNYING',
  },
  {
    id: 9,
    title: '访客',
    parentId: 0,
    status: 1,
    code: 'FANGKE',
  },
];
