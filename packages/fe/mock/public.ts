export default [
  // submit
  {
    url: '/public/submit',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
      }
    },
  },
  {
    url: '/public/options',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            label: '启用',
            value: 0,
          },
          {
            label: '禁用',
            value: 1,
          },
        ],
        message: 'success',
      }
    },
  },
  {
    url: '/public/tree',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            label: '1',
            value: '1',
            children: [
              {
                label: '1-1',
                value: '1-1',
              },
              {
                label: '1-2',
                value: '1-2',
              },
            ],
          },
          {
            label: '2',
            value: '2',
          },
        ],
        message: 'success',
      }
    },
  },
]
